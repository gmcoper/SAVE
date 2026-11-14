/**
 * SAVE AMERICA PETITION PLATFORM - REPRESENTATIVES DIRECTORY CONTROLLER
 * 
 * Displays all federal representatives (House & Senate), constituent signature counts,
 * and allows drill-down into constituent petition cards with photos, text options, and video links.
 */

let allPetitions = [];
let allReps = [];
let filteredReps = [];

document.addEventListener("DOMContentLoaded", async () => {
  allPetitions = await GDriveClient.loadAllPetitions();
  allReps = getAllRepresentatives();
  
  initFilters();
  applyFiltersAndRender();
  initGDriveModal();
});

/**
 * Filter event listeners
 */
function initFilters() {
  const searchInput = document.getElementById("searchRepInput");
  const chamberFilter = document.getElementById("filterChamber");
  const stateFilter = document.getElementById("filterState");
  const sortFilter = document.getElementById("filterSort");

  // Populate 50 states dropdown
  const states = Object.keys(STATE_NAMES).sort();
  states.forEach(st => {
    const opt = document.createElement("option");
    opt.value = st;
    opt.textContent = `${STATE_NAMES[st]} (${st})`;
    stateFilter.appendChild(opt);
  });

  searchInput.addEventListener("input", applyFiltersAndRender);
  chamberFilter.addEventListener("change", applyFiltersAndRender);
  stateFilter.addEventListener("change", applyFiltersAndRender);
  sortFilter.addEventListener("change", applyFiltersAndRender);
}

/**
 * Filter & Sort Logic
 */
function applyFiltersAndRender() {
  const query = (document.getElementById("searchRepInput").value || "").toLowerCase().trim();
  const chamber = document.getElementById("filterChamber").value;
  const state = document.getElementById("filterState").value;
  const sort = document.getElementById("filterSort").value;

  filteredReps = allReps.filter(rep => {
    // Chamber filter
    if (chamber !== "all" && rep.chamber !== chamber) return false;
    
    // State filter
    if (state !== "all" && rep.state !== state) return false;

    // Search query
    if (query) {
      const matchName = rep.name.toLowerCase().includes(query);
      const matchState = (rep.stateName || rep.state).toLowerCase().includes(query);
      const matchParty = rep.party.toLowerCase().includes(query);
      if (!matchName && !matchState && !matchParty) return false;
    }

    return true;
  });

  // Calculate constituent signers for each rep
  const repSignerMap = mapConstituentsToReps();

  // Sorting
  filteredReps.sort((a, b) => {
    const countA = (repSignerMap[a.name] || []).length;
    const countB = (repSignerMap[b.name] || []).length;

    if (sort === "most-signatures") {
      return countB - countA;
    } else if (sort === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sort === "state-asc") {
      return a.state.localeCompare(b.state);
    }
    return 0;
  });

  renderRepresentativeCards(repSignerMap);
}

/**
 * Maps all petitions to their corresponding Representatives & Senators
 */
function mapConstituentsToReps() {
  const map = {};
  
  allPetitions.forEach(p => {
    // Match House Representative
    if (p.representative && p.representative.name) {
      const repKey = p.representative.name;
      if (!map[repKey]) map[repKey] = [];
      map[repKey].push(p);
    }

    // Match Senators
    if (Array.isArray(p.senators)) {
      p.senators.forEach(sen => {
        if (sen && sen.name) {
          const senKey = sen.name;
          if (!map[senKey]) map[senKey] = [];
          map[senKey].push(p);
        }
      });
    }
  });

  return map;
}

/**
 * Render Representative Cards Grid
 */
function renderRepresentativeCards(repSignerMap) {
  const container = document.getElementById("repGridContainer");
  const countDisplay = document.getElementById("matchingRepsCount");

  if (!container) return;
  container.innerHTML = "";

  if (countDisplay) {
    countDisplay.innerText = `${filteredReps.length} Representatives & Senators Found`;
  }

  if (filteredReps.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--text-muted);">
        <i class="fa-solid fa-user-xmark" style="font-size: 38px; color: var(--gold-primary); margin-bottom: 12px;"></i>
        <h4 style="color: var(--white); font-size: 18px; margin-bottom: 6px;">No Representatives Found</h4>
        <p>Try broadening your search or clearing the state/chamber filters.</p>
      </div>
    `;
    return;
  }

  filteredReps.forEach(rep => {
    const constituents = repSignerMap[rep.name] || [];
    const count = constituents.length;
    const isSenator = rep.chamber === "Senate";

    const partyClass = rep.party === "Republican" ? "party-r" : (rep.party === "Democrat" ? "party-d" : "party-i");
    const roleTitle = isSenator ? `U.S. Senator (${rep.state})` : `U.S. Representative (${rep.state}-${rep.district || 'At-Large'})`;

    const card = document.createElement("div");
    card.className = "rep-card";

    card.innerHTML = `
      <div class="rep-card-top">
        <div class="rep-portrait">
          <i class="fa-solid ${isSenator ? 'fa-landmark' : 'fa-building-columns'}"></i>
        </div>
        <div class="rep-meta">
          <h4 class="rep-name">${rep.name}</h4>
          <span class="rep-chamber-badge">${roleTitle}</span>
          <span class="rep-party-pill ${partyClass}">${rep.party}</span>
        </div>
      </div>

      <!-- Constituent Signatures Counter Badge -->
      <div class="rep-sign-stat">
        <div>
          <div class="rep-sign-count">${count}</div>
          <div class="rep-sign-label">Constituents Signed</div>
        </div>
        <div style="font-size: 20px; color: ${count > 0 ? 'var(--gold-primary)' : 'var(--text-muted)'};">
          <i class="fa-solid fa-users"></i>
        </div>
      </div>

      <!-- Official DC Mailing Address -->
      <div class="rep-address-block">
        <div class="rep-address-title">
          <span>Official Washington, D.C. Address</span>
          <button type="button" class="btn-copy-address" onclick="copyRepAddress('${rep.name}', '${rep.dcAddress}')" title="Copy Address">
            <i class="fa-regular fa-copy"></i> Copy
          </button>
        </div>
        <div>The Honorable ${rep.name}</div>
        <div>${rep.chamber === 'Senate' ? 'United States Senate' : 'U.S. House of Representatives'}</div>
        <div>${rep.dcAddress}</div>
        <div style="margin-top: 4px; color: var(--gold-light);">Phone: ${rep.phone || '(202) 224-3121'}</div>
      </div>

      <!-- Action Button: View Constituents -->
      <button type="button" class="btn-view-constituents" onclick="openConstituentDrawer('${rep.name.replace(/'/g, "\\'")}')">
        <i class="fa-solid fa-address-book"></i> View Constituent Voices (${count})
      </button>
    `;

    container.appendChild(card);
  });
}

function copyRepAddress(name, address) {
  const full = `The Honorable ${name}\n${address}`;
  navigator.clipboard.writeText(full).then(() => {
    alert(`Mailing address for ${name} copied to clipboard!`);
  }).catch(() => {
    prompt("Copy address below:", full);
  });
}

/**
 * Open Constituent Voices Modal/Drawer for a specific representative
 */
function openConstituentDrawer(repName) {
  const modal = document.getElementById("constituentDrawerModal");
  const title = document.getElementById("drawerModalTitle");
  const listContainer = document.getElementById("constituentPetitionsList");

  if (!modal || !listContainer) return;

  const rep = allReps.find(r => r.name === repName) || { name: repName, chamber: "Congress" };
  const repSignerMap = mapConstituentsToReps();
  const constituents = repSignerMap[repName] || [];

  title.innerHTML = `
    <span><i class="fa-solid fa-users-viewfinder" style="color:var(--gold-primary);"></i> Constituents of ${rep.name}</span>
    <span style="font-size: 13px; font-weight: normal; color: var(--gold-light); margin-left: 10px;">
      (${constituents.length} Signed Petitions)
    </span>
  `;

  listContainer.innerHTML = "";

  if (constituents.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 16px; color: var(--text-muted);">
        <i class="fa-regular fa-folder-open" style="font-size: 36px; color: var(--border-gold); margin-bottom: 12px;"></i>
        <h4 style="color: var(--white); font-size: 16px; margin-bottom: 6px;">No Constituent Petitions Yet</h4>
        <p style="font-size: 13px;">Be the first constituent from this district or state to sign and deliver your petition!</p>
        <a href="index.html#signSection" class="btn-submit-petition" style="display:inline-flex; width:auto; font-size:13px; padding:10px 18px; margin-top:16px;">
          <i class="fa-solid fa-pen-nib"></i> Sign Petition for ${rep.name}
        </a>
      </div>
    `;
  } else {
    constituents.forEach(item => {
      const card = document.createElement("div");
      card.className = "constituent-entry-card";

      const photoHtml = item.photoUrl
        ? `<img src="${item.photoUrl}" class="constituent-photo-lg" alt="${item.name}" />`
        : `<div class="constituent-photo-lg" style="display:flex;align-items:center;justify-content:center;color:var(--gold-light);font-size:26px;"><i class="fa-solid fa-user"></i></div>`;

      const videoBtn = item.videoUrl
        ? `<button type="button" class="btn-watch-video" onclick="playConstituentVideo('${item.videoUrl}', '${item.name.replace(/'/g, "\\'")}')"><i class="fa-solid fa-circle-play"></i> Watch Video Statement</button>`
        : `<span style="font-size:11px; color:var(--text-muted); font-style:italic;">No video submitted</span>`;

      card.innerHTML = `
        ${photoHtml}
        <div class="constituent-entry-content">
          <div class="constituent-header-row">
            <span class="constituent-name">${item.name}</span>
            <span class="constituent-zip-badge"><i class="fa-solid fa-location-dot"></i> ${item.city || ""}, ${item.state} ${item.zip}</span>
          </div>
          <div>
            <span class="constituent-concern-badge">${item.selectedOption ? item.selectedOption.badge : "Constituent"}</span>
          </div>
          <div class="constituent-text-quote">
            <strong>Selected Grievance:</strong> "${item.selectedOption ? item.selectedOption.text : ""}"
          </div>
          <div>
            ${videoBtn}
          </div>
        </div>
      `;

      listContainer.appendChild(card);
    });
  }

  modal.classList.add("active");
}

function closeConstituentDrawer() {
  document.getElementById("constituentDrawerModal").classList.remove("active");
}

function playConstituentVideo(videoUrl, name) {
  const modal = document.getElementById("repsVideoPlayerModal");
  const player = document.getElementById("repsModalVideoPlayer");
  const title = document.getElementById("repsVideoModalTitle");

  title.innerText = `Constituent Video: ${name}`;
  player.src = videoUrl;
  modal.classList.add("active");
  player.play().catch(() => {});
}

function closeRepsVideoPlayerModal() {
  const modal = document.getElementById("repsVideoPlayerModal");
  const player = document.getElementById("repsModalVideoPlayer");
  if (player) {
    player.pause();
    player.src = "";
  }
  modal.classList.remove("active");
}

/**
 * Google Drive modal reuse on reps page
 */
function initGDriveModal() {
  const syncBtn = document.getElementById("btnOpenGDriveModal");
  const modal = document.getElementById("gdriveConfigModal");
  const inputUrl = document.getElementById("inputGDriveScriptUrl");

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
        <i class="fa-solid fa-link"></i> Connected to Google Apps Script Webhook.
      </div>
    `;
  } else {
    statusEl.innerHTML = `
      <div style="color: var(--gold-light); font-size: 13px; display:flex; align-items:center; gap:6px;">
        <i class="fa-solid fa-circle-info"></i> Running in Local Browser Mode.
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
  // Reload
  window.location.reload();
}

function closeGDriveModal() {
  document.getElementById("gdriveConfigModal").classList.remove("active");
}
