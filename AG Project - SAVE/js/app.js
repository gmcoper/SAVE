/**
 * SAVE AMERICA PETITION PLATFORM - MAIN APP CONTROLLER
 * 
 * Handles form validation, zip code resolution, photo/video handling,
 * Leaflet USA map visualization, and petition submissions.
 */

let nationalMap = null;
let mapMarkersGroup = null;
let currentPetitions = [];
let selectedConcern = null;
let stagedPhotoBase64 = null;
let stagedVideoBase64 = null;
let stagedPhotoFile = null;
let stagedVideoFile = null;
let currentResolvedGeo = null;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", async () => {
  initOptionsSelector();
  initFormListeners();
  initMap();
  await loadAndDisplayPetitions();
  initGDriveModal();
});

/**
 * 1. Initialize Curated Petition Options
 */
function initOptionsSelector() {
  const container = document.getElementById("petitionOptionsGrid");
  if (!container) return;

  container.innerHTML = "";
  CONFIG.PETITION_OPTIONS.forEach((opt, index) => {
    const card = document.createElement("div");
    card.className = `petition-option-card ${index === 0 ? "selected" : ""}`;
    card.dataset.id = opt.id;

    if (index === 0) selectedConcern = opt;

    card.innerHTML = `
      <div class="option-radio-indicator"></div>
      <div class="option-content">
        <div class="option-title-row">
          <span class="option-title">${opt.title}</span>
          <span class="option-badge">${opt.badge}</span>
        </div>
        <p class="option-text-quote">"${opt.text}"</p>
      </div>
    `;

    card.addEventListener("click", () => {
      document.querySelectorAll(".petition-option-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedConcern = opt;
      updateLetterPreviewIfOpen();
    });

    container.appendChild(card);
  });
}

/**
 * 2. Form Listeners & Real-Time Zip Code Federal Representation Lookup
 */
function initFormListeners() {
  const zipInput = document.getElementById("inputZipCode");
  const repPreviewContainer = document.getElementById("repPreviewContainer");

  // Real-time zip lookup
  zipInput.addEventListener("input", (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 5);
    e.target.value = val;

    if (val.length === 5) {
      resolveAndShowRepresentation(val);
    } else {
      repPreviewContainer.innerHTML = `
        <div style="text-align:center; padding: 14px; color: var(--text-muted); font-size: 13px;">
          <i class="fa-solid fa-flag-usa" style="color: var(--gold-primary); margin-right: 6px;"></i>
          Enter your 5-digit zip code to identify your U.S. House Representative & Senators.
        </div>
      `;
      currentResolvedGeo = null;
    }
  });

  // Photo file upload & validation (Max 2MB)
  const photoInput = document.getElementById("inputPhoto");
  const photoDropzone = document.getElementById("photoDropzone");
  const photoPreview = document.getElementById("photoPreview");

  photoDropzone.addEventListener("click", () => photoInput.click());
  photoInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = GDriveClient.validatePhoto(file);
    if (!validation.valid) {
      alert(validation.error);
      photoInput.value = "";
      return;
    }

    try {
      stagedPhotoFile = file;
      stagedPhotoBase64 = await GDriveClient.readFileAsBase64(file);
      showPhotoPreview(file, stagedPhotoBase64);
    } catch (err) {
      alert("Failed to read image file.");
    }
  });

  // Video file upload & validation (Max 10MB)
  const videoInput = document.getElementById("inputVideo");
  const videoDropzone = document.getElementById("videoDropzone");
  const videoPreview = document.getElementById("videoPreview");

  videoDropzone.addEventListener("click", () => videoInput.click());
  videoInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = GDriveClient.validateVideo(file);
    if (!validation.valid) {
      alert(validation.error);
      videoInput.value = "";
      return;
    }

    try {
      stagedVideoFile = file;
      stagedVideoBase64 = await GDriveClient.readFileAsBase64(file);
      showVideoPreview(file, stagedVideoBase64);
    } catch (err) {
      alert("Failed to read video file.");
    }
  });

  // Form submission
  const form = document.getElementById("petitionForm");
  form.addEventListener("submit", handlePetitionSubmit);
}

/**
 * Resolves zip code and displays official congressional representation
 */
async function resolveAndShowRepresentation(zip) {
  const container = document.getElementById("repPreviewContainer");
  
  // Show brief loading indicator while live resolving
  container.innerHTML = `
    <div style="text-align:center; padding: 14px; color: var(--gold-light); font-size: 13px;">
      <i class="fa-solid fa-spinner fa-spin" style="margin-right: 6px;"></i> Identifying federal representation for zip ${zip}...
    </div>
  `;

  const geo = await lookupZipCodeAsync(zip);
  currentResolvedGeo = geo;

  if (!geo.valid) {
    container.innerHTML = `<div style="color:#ef4444; font-size:13px; padding:10px;">${geo.error}</div>`;
    return;
  }

  const rep = geo.representative;
  const senators = geo.senators;

  let html = `
    <div class="representation-live-box">
      <div class="rep-box-header">
        <span class="rep-box-title">
          <i class="fa-solid fa-landmark-dome"></i> Your Federal Representation
        </span>
        <span class="rep-location-pill">${geo.city}, ${geo.state} (Dist. ${geo.district})</span>
      </div>

      <div class="rep-items-list">
        <!-- U.S. House Representative -->
        <div class="rep-item">
          <div class="rep-item-avatar"><i class="fa-solid fa-user-tie"></i></div>
          <div class="rep-item-details">
            <div class="rep-item-name">${rep.name} <span class="rep-party-pill ${rep.party === 'Republican' ? 'party-r' : 'party-d'}">${rep.party}</span></div>
            <div class="rep-item-chamber">U.S. House of Representatives (District ${geo.district})</div>
            <div class="rep-item-address">
              <strong>Mailing Address for Written Petition:</strong><br/>
              The Honorable ${rep.name}<br/>
              ${rep.dcAddress}<br/>
              Phone: ${rep.phone}
            </div>
            <button type="button" class="btn-copy-address" onclick="copyAddress('${formatMailingAddress(rep).replace(/\n/g, '\\n')}')">
              <i class="fa-regular fa-copy"></i> Copy Address
            </button>
          </div>
        </div>

        <!-- U.S. Senators -->
        ${senators.map(sen => `
          <div class="rep-item">
            <div class="rep-item-avatar"><i class="fa-solid fa-landmark"></i></div>
            <div class="rep-item-details">
              <div class="rep-item-name">${sen.name} <span class="rep-party-pill ${sen.party === 'Republican' ? 'party-r' : (sen.party === 'Democrat' ? 'party-d' : 'party-i')}">${sen.party}</span></div>
              <div class="rep-item-chamber">United States Senate (${geo.state})</div>
              <div class="rep-item-address">
                <strong>Mailing Address for Written Petition:</strong><br/>
                The Honorable ${sen.name}<br/>
                ${sen.dcAddress}<br/>
                Phone: ${sen.phone}
              </div>
              <button type="button" class="btn-copy-address" onclick="copyAddress('${formatMailingAddress(sen).replace(/\n/g, '\\n')}')">
                <i class="fa-regular fa-copy"></i> Copy Address
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <div style="margin-top: 14px; text-align: center;">
        <button type="button" class="btn-gdrive-sync" style="width: 100%; justify-content: center; padding: 10px;" onclick="openLetterPreviewModal()">
          <i class="fa-solid fa-print"></i> Generate Printable Written Petition for Mailing
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function copyAddress(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Official Congressional Mailing Address copied to clipboard!");
  }).catch(() => {
    prompt("Copy address below:", text);
  });
}

/**
 * Photo & Video Preview Handlers
 */
function showPhotoPreview(file, dataUrl) {
  const container = document.getElementById("photoPreview");
  container.innerHTML = `
    <div class="file-preview-box">
      <img src="${dataUrl}" class="file-preview-thumb" alt="Petitioner Photo" />
      <div class="file-preview-info">
        <div class="file-preview-name">${file.name}</div>
        <div class="file-preview-size">${(file.size / (1024 * 1024)).toFixed(2)} MB (Max 2 MB) - Photo Ready</div>
      </div>
      <button type="button" class="btn-remove-file" onclick="removePhoto()" title="Remove photo">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `;
}

function removePhoto() {
  stagedPhotoBase64 = null;
  stagedPhotoFile = null;
  document.getElementById("inputPhoto").value = "";
  document.getElementById("photoPreview").innerHTML = "";
}

function showVideoPreview(file, dataUrl) {
  const container = document.getElementById("videoPreview");
  container.innerHTML = `
    <div class="file-preview-box" style="flex-direction: column; align-items: stretch;">
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div class="file-preview-info">
          <div class="file-preview-name"><i class="fa-solid fa-video" style="color:var(--gold-primary); margin-right:6px;"></i>${file.name}</div>
          <div class="file-preview-size">${(file.size / (1024 * 1024)).toFixed(2)} MB (Max 10 MB) - Video Ready</div>
        </div>
        <button type="button" class="btn-remove-file" onclick="removeVideo()" title="Remove video">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <video src="${dataUrl}" controls style="width:100%; max-height:160px; margin-top:8px; border-radius:4px; background:#000;"></video>
    </div>
  `;
}

function removeVideo() {
  stagedVideoBase64 = null;
  stagedVideoFile = null;
  document.getElementById("inputVideo").value = "";
  document.getElementById("videoPreview").innerHTML = "";
}

/**
 * 3. Petition Submission Handler
 */
async function handlePetitionSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("inputName");
  const zipInput = document.getElementById("inputZipCode");
  const submitBtn = document.getElementById("btnSubmitPetition");

  const name = nameInput.value.trim();
  const zip = zipInput.value.trim();

  if (!name) {
    alert("Please enter your name.");
    nameInput.focus();
    return;
  }

  if (!zip || zip.length !== 5) {
    alert("Please enter a valid 5-digit US zip code.");
    zipInput.focus();
    return;
  }

  if (!currentResolvedGeo || !currentResolvedGeo.valid) {
    await resolveAndShowRepresentation(zip);
  }

  const geo = currentResolvedGeo || await lookupZipCodeAsync(zip);

  if (!selectedConcern) {
    selectedConcern = CONFIG.PETITION_OPTIONS[0];
  }

  // Disable button and show patriotic loading state
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Recording Your American Voice...`;

  const newPetition = {
    name: name,
    zip: zip,
    city: geo.city,
    state: geo.state,
    stateName: geo.stateName,
    lat: geo.lat,
    lng: geo.lng,
    district: geo.district,
    selectedOption: selectedConcern,
    representative: geo.representative,
    senators: geo.senators,
    photoBase64: stagedPhotoBase64,
    photoFileName: stagedPhotoFile ? stagedPhotoFile.name : null,
    photoUrl: stagedPhotoBase64 || null,
    videoBase64: stagedVideoBase64,
    videoFileName: stagedVideoFile ? stagedVideoFile.name : null,
    videoUrl: stagedVideoBase64 || null
  };

  try {
    const result = await GDriveClient.submitPetition(newPetition);
    
    // Add to active local list
    currentPetitions.unshift(result.data);

    // Update Counter
    updateNationalCounters();

    // Add marker pin to Map immediately and pan
    addPetitionMarkerToMap(result.data, true);

    // Update Recent Signers feed
    renderRecentSigners();

    // Reset Form
    formReset();

    // Open Confirmation Modal
    openSubmissionSuccessModal(result.data);

  } catch (err) {
    alert("Error submitting petition: " + err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
}

function formReset() {
  document.getElementById("petitionForm").reset();
  removePhoto();
  removeVideo();
  currentResolvedGeo = null;
  document.getElementById("repPreviewContainer").innerHTML = `
    <div style="text-align:center; padding: 14px; color: var(--text-muted); font-size: 13px;">
      <i class="fa-solid fa-flag-usa" style="color: var(--gold-primary); margin-right: 6px;"></i>
      Enter your 5-digit zip code to identify your U.S. House Representative & Senators.
    </div>
  `;
}

/**
 * 4. Interactive Leaflet USA Map Initialization
 */
function initMap() {
  const mapElement = document.getElementById("nationalMap");
  if (!mapElement) return;

  if (typeof L === "undefined") {
    mapElement.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--gold-light); text-align:center; padding:24px;">
        <i class="fa-solid fa-earth-americas" style="font-size:48px; margin-bottom:14px; color:var(--gold-primary);"></i>
        <h4 style="font-size:18px; color:#fff; margin-bottom:6px;">National Map Ready</h4>
        <p style="color:var(--text-muted); font-size:13px; max-width:380px;">Map pins will render once Leaflet CDN scripts load. All petition signing, zip resolution, and representative features are active.</p>
      </div>
    `;
    return;
  }

  // Initialize Map centered on geographic center of Continental US
  nationalMap = L.map("nationalMap", {
    center: [39.8283, -98.5795],
    zoom: 4,
    minZoom: 3,
    maxZoom: 10,
    scrollWheelZoom: false
  });

  // Dark patriotic cartography tiles
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_598o_1_b8f889c1cd494a52af122e41", {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> | SAVE America',
    subdomains: "abcd",
    maxZoom: 19
  }).addTo(nationalMap);

  mapMarkersGroup = L.layerGroup().addTo(nationalMap);

  // Map Filter Buttons
  const filterBtns = document.querySelectorAll(".map-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filterId = btn.dataset.filter;
      filterMapPins(filterId);
    });
  });
}

function addPetitionMarkerToMap(petition, animate = false) {
  if (!nationalMap || !mapMarkersGroup) return;

  const lat = petition.lat || 38.90;
  const lng = petition.lng || -77.03;

  // Custom patriotic pin icon
  const hasVideo = !!petition.videoUrl;
  const markerColor = hasVideo ? "#0284c7" : "#b22234";

  const customIcon = L.divIcon({
    className: "custom-map-pin",
    html: `
      <div style="
        width: 22px; 
        height: 22px; 
        background: ${markerColor}; 
        border: 2px solid #d4af37; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg); 
        box-shadow: 0 0 10px rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="transform: rotate(45deg); color: #fff; font-size: 9px; font-weight: bold;">★</span>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -22]
  });

  const marker = L.marker([lat, lng], { icon: customIcon });

  const avatar = petition.photoUrl 
    ? `<img src="${petition.photoUrl}" class="map-popup-avatar" alt="${petition.name}" />`
    : `<div class="map-popup-avatar" style="display:flex;align-items:center;justify-content:center;background:#0a1730;color:#d4af37;"><i class="fa-solid fa-user"></i></div>`;

  const videoBadge = hasVideo 
    ? `<div class="map-popup-video-badge"><i class="fa-solid fa-play"></i> Video Submitted</div>`
    : ``;

  const popupContent = `
    <div class="map-popup-card">
      <div class="map-popup-header">
        ${avatar}
        <div>
          <div class="map-popup-name">${petition.name}</div>
          <div class="map-popup-location"><i class="fa-solid fa-location-dot"></i> ${petition.city || ""}, ${petition.state} (${petition.zip})</div>
        </div>
      </div>
      <div class="map-popup-concern">
        <strong>${petition.selectedOption ? petition.selectedOption.title : "Petition"}</strong>: 
        "${petition.selectedOption ? petition.selectedOption.text : ""}"
      </div>
      ${videoBadge}
    </div>
  `;

  marker.bindPopup(popupContent);
  marker.petitionData = petition;
  mapMarkersGroup.addLayer(marker);

  if (animate) {
    nationalMap.flyTo([lat, lng], 6, { duration: 1.5 });
    setTimeout(() => marker.openPopup(), 1600);
  }
}

function filterMapPins(filterId) {
  if (!mapMarkersGroup) return;
  mapMarkersGroup.clearLayers();

  const filtered = filterId === "all" 
    ? currentPetitions 
    : (filterId === "video" 
        ? currentPetitions.filter(p => !!p.videoUrl)
        : currentPetitions.filter(p => p.selectedOption && p.selectedOption.id === filterId));

  filtered.forEach(p => addPetitionMarkerToMap(p, false));
}

/**
 * 5. Load and Render Petitions
 */
async function loadAndDisplayPetitions() {
  currentPetitions = await GDriveClient.loadAllPetitions();

  // Populate map markers
  if (mapMarkersGroup) {
    mapMarkersGroup.clearLayers();
    currentPetitions.forEach(p => addPetitionMarkerToMap(p, false));
  }

  // Update Counters
  updateNationalCounters();

  // Render Recent Signers
  renderRecentSigners();
}

function updateNationalCounters() {
  const countEl = document.getElementById("nationalSignerCount");
  const statesEl = document.getElementById("nationalStateCount");
  const distEl = document.getElementById("nationalDistCount");

  const total = currentPetitions.length;
  const states = new Set(currentPetitions.map(p => p.state)).size;
  const districts = new Set(currentPetitions.map(p => `${p.state}-${p.district || 1}`)).size;

  if (countEl) countEl.innerText = total.toLocaleString();
  if (statesEl) statesEl.innerText = states.toLocaleString();
  if (distEl) distEl.innerText = districts.toLocaleString();
}

function renderRecentSigners() {
  const container = document.getElementById("recentSignersGrid");
  if (!container) return;

  const displayList = currentPetitions.slice(0, 8);
  container.innerHTML = "";

  displayList.forEach(p => {
    const card = document.createElement("div");
    card.className = "signer-card";

    const avatarHtml = p.photoUrl
      ? `<img src="${p.photoUrl}" class="signer-avatar" alt="${p.name}" />`
      : `<div class="signer-avatar" style="display:flex;align-items:center;justify-content:center;color:var(--gold-light);font-size:20px;"><i class="fa-solid fa-user-check"></i></div>`;

    const videoHtml = p.videoUrl
      ? `<div class="signer-video-link" onclick="openVideoPlayerModal('${p.videoUrl}', '${p.name}')"><i class="fa-solid fa-circle-play"></i> Watch Video Message</div>`
      : "";

    card.innerHTML = `
      ${avatarHtml}
      <div class="signer-info">
        <div class="signer-name-row">
          <span class="signer-name">${p.name}</span>
          <span class="signer-state-pill">${p.state} ${p.zip}</span>
        </div>
        <div class="signer-concern-tag">${p.selectedOption ? p.selectedOption.badge : "Constituent"}</div>
        <p class="signer-quote">"${p.selectedOption ? p.selectedOption.text : ""}"</p>
        ${videoHtml}
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * 6. Video Player Modal
 */
function openVideoPlayerModal(videoUrl, petitionerName) {
  const modal = document.getElementById("videoPlayerModal");
  const player = document.getElementById("modalVideoPlayer");
  const title = document.getElementById("videoModalTitle");

  if (!modal || !player) return;

  title.innerText = `Constituent Video Message: ${petitionerName}`;
  player.src = videoUrl;
  modal.classList.add("active");
  player.play().catch(() => {});
}

function closeVideoPlayerModal() {
  const modal = document.getElementById("videoPlayerModal");
  const player = document.getElementById("modalVideoPlayer");
  if (player) {
    player.pause();
    player.src = "";
  }
  if (modal) modal.classList.remove("active");
}

/**
 * 7. Printable Formal Letter Modal to Congress
 */
let activeLetterData = null;

function openLetterPreviewModal() {
  if (!currentResolvedGeo || !currentResolvedGeo.valid) {
    alert("Please enter a valid zip code first to generate your letter.");
    return;
  }

  const name = document.getElementById("inputName").value.trim() || "American Citizen";
  const concern = selectedConcern || CONFIG.PETITION_OPTIONS[0];

  activeLetterData = {
    name: name,
    zip: currentResolvedGeo.zip,
    city: currentResolvedGeo.city,
    state: currentResolvedGeo.state,
    representative: currentResolvedGeo.representative,
    senators: currentResolvedGeo.senators,
    concern: concern
  };

  renderLetterContent();
  document.getElementById("letterPreviewModal").classList.add("active");
}

function updateLetterPreviewIfOpen() {
  const modal = document.getElementById("letterPreviewModal");
  if (modal && modal.classList.contains("active") && activeLetterData) {
    activeLetterData.concern = selectedConcern;
    renderLetterContent();
  }
}

function renderLetterContent() {
  const paper = document.getElementById("printableLetterContent");
  if (!paper || !activeLetterData) return;

  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const rep = activeLetterData.representative;
  const sen1 = activeLetterData.senators[0];
  const sen2 = activeLetterData.senators[1];

  paper.innerHTML = `
    <div class="printable-petition-paper">
      <div class="letterhead-flag">
        <div class="letterhead-title">PETITION OF CONSTITUENT GRIEVANCE</div>
        <div class="letterhead-sub">To the Congress of the United States • Under Article I of the Constitution</div>
      </div>

      <div style="display:flex; justify-content:space-between; margin-bottom: 24px; font-size:13px;">
        <div>
          <strong>DATE:</strong> ${today}<br/>
          <strong>FROM:</strong> ${activeLetterData.name}<br/>
          <strong>RESIDENCE:</strong> ${activeLetterData.city}, ${activeLetterData.state} ${activeLetterData.zip}
        </div>
        <div style="text-align:right;">
          <strong>CONGRESSIONAL DISTRICT:</strong> ${activeLetterData.state}-${rep.district || 1}<br/>
          <strong>STATUS:</strong> Verified Constituent Signature
        </div>
      </div>

      <div class="letter-recipient-block">
        <strong>TO THE HONORABLE FEDERAL REPRESENTATIVES:</strong><br/>
        1. <strong>Representative ${rep.name}</strong>, U.S. House of Representatives (${rep.dcAddress})<br/>
        2. <strong>Senator ${sen1 ? sen1.name : "U.S. Senator"}</strong>, United States Senate (${sen1 ? sen1.dcAddress : "Washington, DC 20510"})<br/>
        3. <strong>Senator ${sen2 ? sen2.name : "U.S. Senator"}</strong>, United States Senate (${sen2 ? sen2.dcAddress : "Washington, DC 20510"})
      </div>

      <div class="letter-body">
        <p style="margin-bottom: 14px;"><strong>RE: ${activeLetterData.concern.title}</strong></p>
        
        <p style="margin-bottom: 14px;">
          I write to you today as your constituent from ${activeLetterData.city}, ${activeLetterData.state} (${activeLetterData.zip}). 
          Under our constitutional right to petition the government for a redress of grievances, I hereby formally deliver my voice 
          and demand that our federal legislature take immediate, decisive action:
        </p>

        <blockquote style="font-weight: bold; background: #f3f4f6; padding: 14px 18px; border-left: 4px solid #b22234; margin: 18px 0; font-size: 14px;">
          "${activeLetterData.concern.text}"
        </blockquote>

        <p style="margin-bottom: 14px;">
          Our nation was built on the enduring principle of government of the people, by the people, and for the people. 
          As my elected voice in Washington, D.C., you bear the solemn oath to preserve, protect, and defend the welfare and 
          constitutional heritage of this Republic.
        </p>

        <p>
          I urge you to support legislation reflecting this concern without delay and to inform me of the specific actions you are 
          taking on behalf of the constituents of ${activeLetterData.state}.
        </p>
      </div>

      <div class="letter-signature-area">
        <p>Respectfully submitted,</p>
        <div style="height: 35px;"></div>
        <div class="signature-line"></div>
        <p><strong>${activeLetterData.name}</strong><br/>Registered Constituent • Zip Code ${activeLetterData.zip}</p>
      </div>
    </div>
  `;
}

function printPetitionLetter() {
  window.print();
}

function closeLetterModal() {
  document.getElementById("letterPreviewModal").classList.remove("active");
}

/**
 * 8. Submission Success Modal
 */
function openSubmissionSuccessModal(petition) {
  const modal = document.getElementById("submissionSuccessModal");
  if (!modal) return;

  const summary = document.getElementById("successModalSummary");
  summary.innerHTML = `
    <div style="text-align:center; padding: 10px 0;">
      <div style="font-size: 50px; color: var(--gold-primary); margin-bottom: 10px;"><i class="fa-solid fa-circle-check"></i></div>
      <h3 style="font-family: var(--font-serif); font-size: 22px; color: var(--white); margin-bottom: 8px;">Your Voice Has Been Counted!</h3>
      <p style="color: var(--text-muted); font-size: 14px; max-width: 440px; margin: 0 auto 16px auto;">
        Thank you, <strong>${petition.name}</strong>! Your petition from <strong>${petition.city}, ${petition.state} (${petition.zip})</strong> 
        has been officially pinned to our national Republic map.
      </p>
      <div style="background: var(--navy-dark); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 14px; text-align: left; font-size: 13px; margin-bottom: 16px;">
        <div style="color: var(--gold-light); font-weight: bold; margin-bottom: 4px;"><i class="fa-solid fa-paper-plane"></i> Delivered to Federal Representation:</div>
        <div>• <strong>House:</strong> ${petition.representative.name} (${petition.representative.party})</div>
        <div>• <strong>Senate:</strong> ${petition.senators.map(s => s.name).join(" & ")}</div>
      </div>
      <button type="button" class="btn-submit-petition" style="margin: 0 auto; max-width: 300px; font-size: 15px; padding: 12px 20px;" onclick="closeSubmissionSuccessModal(); openLetterPreviewModal();">
        <i class="fa-solid fa-print"></i> Print Official Letter to Mail
      </button>
    </div>
  `;

  modal.classList.add("active");
}

function closeSubmissionSuccessModal() {
  document.getElementById("submissionSuccessModal").classList.remove("active");
}

/**
 * 9. Google Drive & Settings Modal
 */
function initGDriveModal() {
  const syncBtn = document.getElementById("btnOpenGDriveModal");
  const modal = document.getElementById("gdriveConfigModal");
  const inputUrl = document.getElementById("inputGDriveScriptUrl");
  const statusEl = document.getElementById("gdriveConnectionStatus");

  if (!syncBtn || !modal) return;

  syncBtn.addEventListener("click", () => {
    inputUrl.value = GDriveClient.getEndpoint();
    updateGDriveStatusDisplay();
    modal.classList.add("active");
  });
}

function updateGDriveStatusDisplay() {
  const statusEl = document.getElementById("gdriveConnectionStatus");
  const endpoint = GDriveClient.getEndpoint();
  if (endpoint) {
    statusEl.innerHTML = `
      <div style="color: #4ade80; font-size: 13px; display:flex; align-items:center; gap:6px;">
        <i class="fa-solid fa-link"></i> Connected to Google Apps Script Webhook. Submissions & media automatically sync to your Google Drive folder & Google Sheets database.
      </div>
    `;
  } else {
    statusEl.innerHTML = `
      <div style="color: var(--gold-light); font-size: 13px; display:flex; align-items:center; gap:6px;">
        <i class="fa-solid fa-circle-info"></i> Running in Local Browser Mode. Submissions are stored locally. Paste your Google Apps Script Web App URL below to sync to Google Drive.
      </div>
    `;
  }
}

function saveGDriveSettings() {
  const url = document.getElementById("inputGDriveScriptUrl").value.trim();
  GDriveClient.setEndpoint(url);
  updateGDriveStatusDisplay();
  alert(url ? "Google Drive endpoint saved!" : "Reset to Local Browser mode.");
  closeGDriveModal();
}

function closeGDriveModal() {
  document.getElementById("gdriveConfigModal").classList.remove("active");
}

function exportPetitionsJSON() {
  const data = GDriveClient.getLocalPetitions();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SAVE_America_Petitions_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

function exportPetitionsCSV() {
  const data = GDriveClient.getLocalPetitions();
  if (!data || data.length === 0) {
    alert("No petitions to export.");
    return;
  }

  const headers = ["ID", "Timestamp", "Name", "Zip", "City", "State", "Representative", "Senators", "Concern", "PhotoURL", "VideoURL"];
  const rows = data.map(p => [
    p.id,
    p.timestamp,
    `"${(p.name || '').replace(/"/g, '""')}"`,
    p.zip,
    p.city,
    p.state,
    `"${p.representative ? p.representative.name : ''}"`,
    `"${p.senators ? p.senators.map(s => s.name).join('; ') : ''}"`,
    `"${p.selectedOption ? p.selectedOption.title : ''}"`,
    p.photoUrl || '',
    p.videoUrl || ''
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SAVE_America_Petitions_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}

function removeSampleEntries() {
  if (confirm("Remove all 10 demonstration entries? Real submissions will be kept.")) {
    GDriveClient.removeSamplePetitions();
    loadAndDisplayPetitions();
    alert("Sample entries removed. The platform is now showing only real submissions.");
  }
}

function clearAllEntries() {
  if (confirm("Are you sure you want to clear all local entries? This cannot be undone.")) {
    GDriveClient.clearAllLocalPetitions();
    loadAndDisplayPetitions();
    alert("Local database cleared.");
  }
}
