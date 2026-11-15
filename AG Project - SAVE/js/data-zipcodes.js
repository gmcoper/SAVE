/**
 * SAVE AMERICA PETITION PLATFORM
 * US Zip Code Resolution & Geocoding Engine
 *
 * Resolves full 5-digit US zip codes to City, State, Congressional District,
 * Latitude & Longitude, and retrieves Federal House & Senate Representatives.
 *
 * Resolution strategy (all lookups use the complete 5-digit zip code):
 *   1. Google Civic Information API  – returns the exact congressional district
 *      and actual current representatives for any US address / zip code.
 *      Requires a free Google API key set in config.js.
 *   2. Zippopotam.us public API – returns city, state, latitude & longitude
 *      for any 5-digit US zip code (CORS-enabled, no key required).
 *   3. Hardcoded representative roster (data-representatives.js) – used as
 *      a fallback when the Civic API key is not configured or the call fails.
 *      Senators (state-wide) will always be correct; the House representative
 *      falls back to the first listed member for the state when the exact
 *      district is unknown.
 *
 * Results are cached in memory so repeated lookups are instant.
 */

// ── Full State Name Lookup ───────────────────────────────────────────
const STATE_NAMES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia", FL: "Florida",
  GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana",
  IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine",
  MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island",
  SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
  VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
};

// ── In-memory cache keyed by 5-digit zip code ────────────────────────
const ZIP_CACHE = {};

// ── Synchronous validation helper (no network) ──────────────────────
/**
 * Validates a 5-digit US zip code string.
 * Returns { valid: true, zip } or { valid: false, error }.
 * This is intentionally *not* used for geo resolution – call
 * lookupZipCodeAsync() for full city / state / representative data.
 */
function lookupZipCode(inputZip) {
  if (!inputZip) return { valid: false, error: "Please enter a 5-digit US zip code." };

  const cleanZip = String(inputZip).trim().slice(0, 5);
  if (!/^\d{5}$/.test(cleanZip)) {
    return { valid: false, error: "Zip code must be exactly 5 numbers." };
  }

  // Return cached full result when available (keeps callers that still
  // call the sync version working after the async lookup has run once).
  if (ZIP_CACHE[cleanZip]) {
    return ZIP_CACHE[cleanZip];
  }

  return { valid: true, zip: cleanZip };
}

// ── Primary async resolver ───────────────────────────────────────────
/**
 * Resolves a 5-digit US zip code to city, state, coordinates, congressional
 * district, House representative, and both US Senators.
 *
 * Resolution order:
 *   1. Return cached result if the zip was already resolved this session.
 *   2. Call the Zippopotam.us API for city / state / lat / lng.
 *   3. Call the Google Civic Information API (if key configured) for the
 *      exact congressional district and current representatives.
 *   4. Fall back to the hardcoded roster in data-representatives.js when
 *      the Civic API is unavailable.
 */
async function lookupZipCodeAsync(inputZip) {
  if (!inputZip) return { valid: false, error: "Please enter a 5-digit US zip code." };

  const cleanZip = String(inputZip).trim().slice(0, 5);
  if (!/^\d{5}$/.test(cleanZip)) {
    return { valid: false, error: "Zip code must be exactly 5 numbers." };
  }

  // 0. Cache hit ──────────────────────────────────────────────────────
  if (ZIP_CACHE[cleanZip]) {
    return ZIP_CACHE[cleanZip];
  }

  let city      = null;
  let stateCode = null;
  let stateName = null;
  let lat       = null;
  let lng       = null;
  let district  = null;
  let senators  = [];
  let representative = null;
  let civicApiUsed   = false;

  // 1. Zippopotam.us – city, state, coordinates ──────────────────────
  try {
    const controller = new AbortController();
    const timeoutId  = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(
      `https://api.zippopotam.us/us/${cleanZip}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.places && data.places.length > 0) {
        const place = data.places[0];
        city      = place["place name"];
        stateCode = place["state abbreviation"];
        stateName = place["state"];
        lat       = parseFloat(place["latitude"]);
        lng       = parseFloat(place["longitude"]);
      }
    }
  } catch (err) {
    console.warn("Zippopotam.us lookup failed or timed out:", err);
  }

  // 2. Google Civic Information API – district & representatives ─────
  const apiKey =
    (typeof CONFIG !== "undefined" && CONFIG.GOOGLE_CIVIC_API_KEY)
      ? CONFIG.GOOGLE_CIVIC_API_KEY
      : null;

  if (apiKey) {
    try {
      const controller = new AbortController();
      const timeoutId  = setTimeout(() => controller.abort(), 5000);

      const civicUrl =
        "https://civicinfo.googleapis.com/civicinfo/v2/representatives" +
        `?address=${encodeURIComponent(cleanZip)}` +
        "&levels=country" +
        "&roles=legislatorUpperBody&roles=legislatorLowerBody" +
        `&key=${encodeURIComponent(apiKey)}`;

      const civicRes = await fetch(civicUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (civicRes.ok) {
        const civicData = await civicRes.json();
        const parsed    = _parseCivicApiResponse(civicData, stateCode);
        civicApiUsed    = true;

        if (parsed.district !== null) district = parsed.district;
        if (parsed.stateCode)         stateCode = stateCode || parsed.stateCode;
        if (parsed.senators.length)   senators = parsed.senators;
        if (parsed.representative)    representative = parsed.representative;
      } else {
        console.warn("Google Civic API returned status", civicRes.status);
      }
    } catch (err) {
      console.warn("Google Civic API lookup failed or timed out:", err);
    }
  }

  // 3. Validate – we need at least a state to continue ───────────────
  if (!stateCode) {
    return {
      valid: false,
      error:
        "Could not resolve zip code " + cleanZip + ". " +
        "Please verify it is a valid US zip code and that you have " +
        "an internet connection."
    };
  }

  if (!stateName) stateName = STATE_NAMES[stateCode] || stateCode;

  // 4. Fallback to hardcoded roster when Civic API was not used ──────
  if (senators.length === 0) {
    senators = getSenatorsForState(stateCode);
  }
  if (!representative) {
    representative = getRepresentativeForLocation(stateCode, district || 1);
  }
  if (district === null) {
    district = representative.district || 1;
  }

  // 5. Build and cache result ────────────────────────────────────────
  const result = {
    valid: true,
    zip: cleanZip,
    city: city || "Unknown",
    state: stateCode,
    stateName: stateName,
    district: district,
    lat: lat !== null && !isNaN(lat) ? Number(lat.toFixed(4)) : 38.9072,
    lng: lng !== null && !isNaN(lng) ? Number(lng.toFixed(4)) : -77.0369,
    senators: senators,
    representative: representative,
    civicApiUsed: civicApiUsed
  };

  ZIP_CACHE[cleanZip] = result;
  return result;
}

// ── Google Civic API response parser ─────────────────────────────────
/**
 * Extracts senators, house representative, congressional district number,
 * and state code from a Google Civic Information API response.
 *
 * The API returns an `offices` array (each with `officialIndices`) and an
 * `officials` array.  Congressional district is parsed from the
 * `divisionId` string which looks like:
 *   "ocd-division/country:us/state:ca/cd:12"
 */
function _parseCivicApiResponse(data, fallbackStateCode) {
  const result = {
    stateCode: fallbackStateCode || null,
    district: null,
    senators: [],
    representative: null
  };

  if (!data || !data.offices || !data.officials) return result;

  // Attempt to pull state from normalizedInput
  if (data.normalizedInput && data.normalizedInput.state) {
    result.stateCode = data.normalizedInput.state;
  }

  const stateCode = result.stateCode || "";
  const stateFullName = STATE_NAMES[stateCode] || stateCode;

  data.offices.forEach(office => {
    const indices = office.officialIndices || [];
    const divId   = office.divisionId || "";

    indices.forEach(idx => {
      const official = data.officials[idx];
      if (!official) return;

      const party = official.party || "Unknown";
      const phones = official.phones || [];
      const phone  = phones.length > 0 ? phones[0] : "(202) 224-3121";

      // ── Senator ──
      if (/legislatorUpperBody/i.test(office.roles?.join(",") || "") ||
          /senator/i.test(office.name || "")) {

        // Try to match to hardcoded record for DC address
        const hardcoded = _findHardcodedSenator(stateCode, official.name);

        result.senators.push({
          id:        hardcoded ? hardcoded.id : `sen-${stateCode.toLowerCase()}-civic`,
          name:      official.name,
          state:     stateCode,
          stateName: stateFullName,
          party:     party,
          chamber:   "Senate",
          building:  hardcoded ? hardcoded.building : "United States Senate",
          room:      hardcoded ? hardcoded.room : "",
          dcAddress: hardcoded ? hardcoded.dcAddress : "United States Senate, Washington, DC 20510",
          phone:     hardcoded ? hardcoded.phone : phone
        });
      }

      // ── House Representative ──
      if (/legislatorLowerBody/i.test(office.roles?.join(",") || "") ||
          /representative/i.test(office.name || "")) {

        // Parse district from divisionId  e.g. ".../cd:12"
        const cdMatch = divId.match(/\/cd:(\d+)/);
        if (cdMatch) {
          result.district = parseInt(cdMatch[1], 10);
        }

        const dist = result.district || 1;
        const hardcoded = _findHardcodedRep(stateCode, dist, official.name);

        result.representative = {
          id:        hardcoded ? hardcoded.id : `rep-${stateCode.toLowerCase()}-${dist}`,
          name:      official.name,
          state:     stateCode,
          district:  dist,
          party:     party,
          chamber:   "House",
          building:  hardcoded ? hardcoded.building : "U.S. House of Representatives",
          room:      hardcoded ? hardcoded.room : "",
          dcAddress: hardcoded ? hardcoded.dcAddress : "U.S. House of Representatives, Washington, DC 20515",
          phone:     hardcoded ? hardcoded.phone : phone
        };
      }
    });
  });

  return result;
}

// ── Hardcoded-roster matching helpers ─────────────────────────────────
/** Find a senator in the hardcoded roster by state + name substring. */
function _findHardcodedSenator(stateCode, name) {
  if (typeof FEDERAL_REPRESENTATIVES === "undefined") return null;
  const code = (stateCode || "").toUpperCase();
  const n    = (name || "").toLowerCase();
  return FEDERAL_REPRESENTATIVES.senators.find(
    s => s.state === code && n.includes(s.name.split(" ").pop().toLowerCase())
  ) || null;
}

/** Find a House rep in the hardcoded roster by state + district or name. */
function _findHardcodedRep(stateCode, district, name) {
  if (typeof FEDERAL_REPRESENTATIVES === "undefined") return null;
  const code = (stateCode || "").toUpperCase();
  const reps = FEDERAL_REPRESENTATIVES.houseRepresentatives.filter(
    r => r.state === code
  );
  // Prefer exact district match
  const byDist = reps.find(r => r.district === district);
  if (byDist) return byDist;
  // Fall back to name match
  const n = (name || "").toLowerCase();
  return reps.find(
    r => n.includes(r.name.split(" ").pop().toLowerCase())
  ) || null;
}
