/**
 * SAVE AMERICA PETITION PLATFORM - STORAGE & GOOGLE DRIVE CLIENT
 * 
 * Manages saving and loading petitions to/from Google Drive & Sheets
 * with seamless local storage fallback and offline capability.
 */

const GDriveClient = {
  /**
   * Save a petition submission
   */
  async submitPetition(petitionData) {
    // 1. Always save locally first for instant feedback and resilience
    const localSaved = this.saveLocalPetition(petitionData);

    // 2. If Google Apps Script URL is configured, push to Google Drive & Sheets
    const endpoint = this.getEndpoint();
    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8" // Avoid CORS preflight complexity in Apps Script
          },
          body: JSON.stringify(petitionData)
        });

        const result = await response.json();
        if (result && result.status === "success") {
          // Update local record with Google Drive URLs
          localSaved.photoUrl = result.photoDriveUrl || localSaved.photoUrl;
          localSaved.videoUrl = result.videoDriveUrl || localSaved.videoUrl;
          localSaved.gdriveSynced = true;
          this.updateLocalPetition(localSaved);
          return { success: true, mode: "gdrive", data: localSaved, result };
        }
      } catch (err) {
        console.warn("Direct Google Drive sync encountered a network error, stored locally:", err);
        return { success: true, mode: "local-queued", data: localSaved, warning: "Saved locally; will sync when Google Drive endpoint is reachable." };
      }
    }

    return { success: true, mode: "local", data: localSaved };
  },

  /**
   * Load all petitions (seed data + local data + remote Google Drive if configured)
   */
  async loadAllPetitions() {
    let petitions = this.getLocalPetitions();
    
    // If empty, initialize with rich realistic seed data
    if (!petitions || petitions.length === 0) {
      petitions = this.getSeedPetitions();
      localStorage.setItem(CONFIG.STORAGE_KEY_PETITIONS, JSON.stringify(petitions));
    }

    // Try fetching latest remote submissions if endpoint configured
    const endpoint = this.getEndpoint();
    if (endpoint) {
      try {
        const response = await fetch(endpoint, { method: "GET" });
        const result = await response.json();
        if (result && result.status === "success" && Array.isArray(result.petitions) && result.petitions.length > 0) {
          // Merge unique remote petitions
          const existingIds = new Set(petitions.map(p => p.id));
          result.petitions.forEach(remoteP => {
            if (!existingIds.has(remoteP.id)) {
              petitions.unshift(remoteP);
              existingIds.add(remoteP.id);
            }
          });
          localStorage.setItem(CONFIG.STORAGE_KEY_PETITIONS, JSON.stringify(petitions));
        }
      } catch (err) {
        console.warn("Could not fetch remote Google Drive petitions:", err);
      }
    }

    return petitions;
  },

  /**
   * Local storage operations
   */
  getLocalPetitions() {
    try {
      const data = localStorage.getItem(CONFIG.STORAGE_KEY_PETITIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Local storage read error", e);
      return [];
    }
  },

  saveLocalPetition(petition) {
    const petitions = this.getLocalPetitions();
    const completeRecord = {
      id: "PET-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(Math.random() * 899 + 100),
      timestamp: new Date().toISOString(),
      ...petition,
      gdriveSynced: false
    };
    petitions.unshift(completeRecord);
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY_PETITIONS, JSON.stringify(petitions));
    } catch (e) {
      // If quota exceeded due to large video base64, save without raw video data URL for local storage
      console.warn("Storage quota warning, storing lightweight reference", e);
      const lightweight = { ...completeRecord, videoBase64: null, videoUrl: "#local-video-saved" };
      petitions[0] = lightweight;
      localStorage.setItem(CONFIG.STORAGE_KEY_PETITIONS, JSON.stringify(petitions));
    }
    return completeRecord;
  },

  updateLocalPetition(updatedPetition) {
    const petitions = this.getLocalPetitions();
    const index = petitions.findIndex(p => p.id === updatedPetition.id);
    if (index !== -1) {
      petitions[index] = updatedPetition;
      localStorage.setItem(CONFIG.STORAGE_KEY_PETITIONS, JSON.stringify(petitions));
    }
  },

  getEndpoint() {
    try {
      return localStorage.getItem(CONFIG.STORAGE_KEY_CONFIG) || CONFIG.GOOGLE_APPS_SCRIPT_URL || "";
    } catch (e) {
      return CONFIG.GOOGLE_APPS_SCRIPT_URL || "";
    }
  },

  setEndpoint(url) {
    const clean = (url || "").trim();
    localStorage.setItem(CONFIG.STORAGE_KEY_CONFIG, clean);
    CONFIG.GOOGLE_APPS_SCRIPT_URL = clean;
  },

  /**
   * File validation helpers
   */
  validatePhoto(file) {
    if (!file) return { valid: true };
    if (!file.type.startsWith("image/")) {
      return { valid: false, error: "Please upload a valid image file (JPG, PNG, WebP)." };
    }
    if (file.size > CONFIG.MAX_PHOTO_SIZE_BYTES) {
      return { valid: false, error: `Photo exceeds the 2 MB limit (Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB).` };
    }
    return { valid: true };
  },

  validateVideo(file) {
    if (!file) return { valid: true };
    if (!file.type.startsWith("video/")) {
      return { valid: false, error: "Please upload a valid video file (MP4, MOV, WebM)." };
    }
    if (file.size > CONFIG.MAX_VIDEO_SIZE_BYTES) {
      return { valid: false, error: `Video exceeds the 10 MB limit (Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB).` };
    }
    return { valid: true };
  },

  readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  },

  /**
   * Rich Realistic Seed Petitions for demonstration and immediate functionality
   */
  getSeedPetitions() {
    return [
      {
        id: "SAV-SEED-01",
        timestamp: "2026-11-12T14:32:00Z",
        name: "David K. Miller",
        zip: "75001",
        city: "Dallas",
        state: "TX",
        stateName: "Texas",
        lat: 32.78,
        lng: -96.80,
        district: 24,
        selectedOption: {
          id: "opt-border",
          title: "Border Security & National Sovereignty",
          badge: "Sovereignty & Security",
          text: "I petition my representatives to enforce all United States immigration laws, ensure full operational control and completion of our national borders, halt unlawful entries, and prioritize the safety, law enforcement, and sovereignty of the American people."
        },
        representative: { name: "Beth Van Duyne", party: "Republican", chamber: "House", dcAddress: "1725 Longworth House Office Building, Washington, DC 20515" },
        senators: [
          { name: "John Cornyn", party: "Republican", chamber: "Senate", dcAddress: "517 Hart Senate Office Building, Washington, DC 20510" },
          { name: "Ted Cruz", party: "Republican", chamber: "Senate", dcAddress: "167 Russell Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        videoTitle: "David Miller Constituent Testimony"
      },
      {
        id: "SAV-SEED-02",
        timestamp: "2026-11-12T16:15:00Z",
        name: "Sarah Jenkins",
        zip: "32801",
        city: "Orlando",
        state: "FL",
        stateName: "Florida",
        lat: 28.54,
        lng: -81.38,
        district: 10,
        selectedOption: {
          id: "opt-economy",
          title: "Economic Liberty & Halting Inflation",
          badge: "Economic Revival",
          text: "I petition my representatives to rein in reckless federal spending, cut burdensome federal regulations, promote American energy independence to lower the cost of living, and enact fiscal policies that protect working families from crippling inflation."
        },
        representative: { name: "Anna Paulina Luna", party: "Republican", chamber: "House", dcAddress: "1017 Longworth House Office Building, Washington, DC 20515" },
        senators: [
          { name: "Marco Rubio", party: "Republican", chamber: "Senate", dcAddress: "284 Russell Senate Office Building, Washington, DC 20510" },
          { name: "Rick Scott", party: "Republican", chamber: "Senate", dcAddress: "110 Hart Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
        videoUrl: null
      },
      {
        id: "SAV-SEED-03",
        timestamp: "2026-11-13T09:44:00Z",
        name: "Robert 'Bob' Henderson",
        zip: "43215",
        city: "Columbus",
        state: "OH",
        stateName: "Ohio",
        lat: 39.96,
        lng: -83.00,
        district: 4,
        selectedOption: {
          id: "opt-constitution",
          title: "Defending the Constitution & Free Speech",
          badge: "Constitutional Rights",
          text: "I petition my representatives to fiercely protect our God-given liberties guaranteed by the U.S. Constitution—specifically the First Amendment rights of free expression, religious liberty, and assembly, and the Second Amendment right to keep and bear arms."
        },
        representative: { name: "Jim Jordan", party: "Republican", chamber: "House", dcAddress: "2056 Rayburn House Office Building, Washington, DC 20515" },
        senators: [
          { name: "Sherrod Brown", party: "Democrat", chamber: "Senate", dcAddress: "503 Hart Senate Office Building, Washington, DC 20510" },
          { name: "JD Vance", party: "Republican", chamber: "Senate", dcAddress: "288 Russell Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        videoTitle: "Robert Henderson Constituent Message"
      },
      {
        id: "SAV-SEED-04",
        timestamp: "2026-11-13T11:20:00Z",
        name: "Col. Thomas Sterling (Ret.)",
        zip: "80903",
        city: "Colorado Springs",
        state: "CO",
        stateName: "Colorado",
        lat: 38.83,
        lng: -104.82,
        district: 3,
        selectedOption: {
          id: "opt-veterans",
          title: "Honoring Veterans & Military Readiness",
          badge: "Veterans & Heroes",
          text: "I petition my representatives to ensure world-class healthcare and earned benefits for our military veterans and first responders, end partisan social experimentation within our armed forces, and restore decisive peace through strength."
        },
        representative: { name: "Lauren Boebert", party: "Republican", chamber: "House", dcAddress: "1713 Longworth House Office Building, Washington, DC 20515" },
        senators: [
          { name: "Michael Bennet", party: "Democrat", chamber: "Senate", dcAddress: "261 Russell Senate Office Building, Washington, DC 20510" },
          { name: "John Hickenlooper", party: "Democrat", chamber: "Senate", dcAddress: "374 Russell Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
        videoUrl: null
      },
      {
        id: "SAV-SEED-05",
        timestamp: "2026-11-13T13:05:00Z",
        name: "Elena Rodriguez",
        zip: "85004",
        city: "Phoenix",
        state: "AZ",
        stateName: "Arizona",
        lat: 33.45,
        lng: -112.07,
        district: 1,
        selectedOption: {
          id: "opt-border",
          title: "Border Security & National Sovereignty",
          badge: "Sovereignty & Security",
          text: "I petition my representatives to enforce all United States immigration laws, ensure full operational control and completion of our national borders, halt unlawful entries, and prioritize the safety, law enforcement, and sovereignty of the American people."
        },
        representative: { name: "David Schweikert", party: "Republican", chamber: "House", dcAddress: "460 Cannon House Office Building, Washington, DC 20515" },
        senators: [
          { name: "Mark Kelly", party: "Democrat", chamber: "Senate", dcAddress: "516 Hart Senate Office Building, Washington, DC 20510" },
          { name: "Kyrsten Sinema", party: "Independent", chamber: "Senate", dcAddress: "317 Hart Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
        videoUrl: null
      },
      {
        id: "SAV-SEED-06",
        timestamp: "2026-11-13T14:40:00Z",
        name: "Gary Vance",
        zip: "15222",
        city: "Pittsburgh",
        state: "PA",
        stateName: "Pennsylvania",
        lat: 40.44,
        lng: -79.99,
        district: 10,
        selectedOption: {
          id: "opt-energy",
          title: "Energy Dominance & American Industry",
          badge: "Energy Independence",
          text: "I petition my representatives to end restrictions on domestic oil, natural gas, and mineral production, revitalize American manufacturing supply chains, and guarantee that the United States is never dependent on hostile foreign adversaries for our energy needs."
        },
        representative: { name: "Scott Perry", party: "Republican", chamber: "House", dcAddress: "2160 Rayburn House Office Building, Washington, DC 20515" },
        senators: [
          { name: "Bob Casey Jr.", party: "Democrat", chamber: "Senate", dcAddress: "393 Russell Senate Office Building, Washington, DC 20510" },
          { name: "John Fetterman", party: "Democrat", chamber: "Senate", dcAddress: "142 Russell Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        videoTitle: "Gary Vance Manufacturing Testimony"
      },
      {
        id: "SAV-SEED-07",
        timestamp: "2026-11-13T17:10:00Z",
        name: "Patricia 'Patty' Lawson",
        zip: "37203",
        city: "Nashville",
        state: "TN",
        stateName: "Tennessee",
        lat: 36.16,
        lng: -86.78,
        district: 2,
        selectedOption: {
          id: "opt-heritage",
          title: "Civic Excellence & American Heritage",
          badge: "American Heritage",
          text: "I petition my representatives to champion patriotic education in our schools, respect parental rights in education, celebrate American exceptionalism and constitutional history, and foster civic unity under our shared founding principles."
        },
        representative: { name: "Tim Burchett", party: "Republican", chamber: "House", dcAddress: "1122 Longworth House Office Building, Washington, DC 20515" },
        senators: [
          { name: "Marsha Blackburn", party: "Republican", chamber: "Senate", dcAddress: "357 Dirksen Senate Office Building, Washington, DC 20510" },
          { name: "Bill Hagerty", party: "Republican", chamber: "Senate", dcAddress: "248 Russell Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&auto=format&fit=crop&q=80",
        videoUrl: null
      },
      {
        id: "SAV-SEED-08",
        timestamp: "2026-11-14T07:22:00Z",
        name: "Hunter McAllister",
        zip: "59101",
        city: "Billings",
        state: "MT",
        stateName: "Montana",
        lat: 45.78,
        lng: -108.50,
        district: 2,
        selectedOption: {
          id: "opt-energy",
          title: "Energy Dominance & American Industry",
          badge: "Energy Independence",
          text: "I petition my representatives to end restrictions on domestic oil, natural gas, and mineral production, revitalize American manufacturing supply chains, and guarantee that the United States is never dependent on hostile foreign adversaries for our energy needs."
        },
        representative: { name: "Matt Rosendale", party: "Republican", chamber: "House", dcAddress: "1023 Longworth House Office Building, Washington, DC 20515" },
        senators: [
          { name: "Jon Tester", party: "Democrat", chamber: "Senate", dcAddress: "311 Hart Senate Office Building, Washington, DC 20510" },
          { name: "Steve Daines", party: "Republican", chamber: "Senate", dcAddress: "320 Hart Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
        videoUrl: null
      },
      {
        id: "SAV-SEED-09",
        timestamp: "2026-11-14T07:50:00Z",
        name: "Cynthia Crawford",
        zip: "30303",
        city: "Atlanta",
        state: "GA",
        stateName: "Georgia",
        lat: 33.75,
        lng: -84.39,
        district: 14,
        selectedOption: {
          id: "opt-constitution",
          title: "Defending the Constitution & Free Speech",
          badge: "Constitutional Rights",
          text: "I petition my representatives to fiercely protect our God-given liberties guaranteed by the U.S. Constitution—specifically the First Amendment rights of free expression, religious liberty, and assembly, and the Second Amendment right to keep and bear arms."
        },
        representative: { name: "Marjorie Taylor Greene", party: "Republican", chamber: "House", dcAddress: "403 Cannon House Office Building, Washington, DC 20515" },
        senators: [
          { name: "Jon Ossoff", party: "Democrat", chamber: "Senate", dcAddress: "303 Hart Senate Office Building, Washington, DC 20510" },
          { name: "Raphael Warnock", party: "Democrat", chamber: "Senate", dcAddress: "416 Russell Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        videoUrl: null
      },
      {
        id: "SAV-SEED-10",
        timestamp: "2026-11-14T08:00:00Z",
        name: "Johnathan Hayes",
        zip: "71101",
        city: "Shreveport",
        state: "LA",
        stateName: "Louisiana",
        lat: 32.52,
        lng: -93.75,
        district: 4,
        selectedOption: {
          id: "opt-border",
          title: "Border Security & National Sovereignty",
          badge: "Sovereignty & Security",
          text: "I petition my representatives to enforce all United States immigration laws, ensure full operational control and completion of our national borders, halt unlawful entries, and prioritize the safety, law enforcement, and sovereignty of the American people."
        },
        representative: { name: "Mike Johnson (Speaker)", party: "Republican", chamber: "House", dcAddress: "568 Cannon House Office Building, Washington, DC 20515" },
        senators: [
          { name: "Bill Cassidy", party: "Republican", chamber: "Senate", dcAddress: "520 Hart Senate Office Building, Washington, DC 20510" },
          { name: "John Kennedy", party: "Republican", chamber: "Senate", dcAddress: "416 Russell Senate Office Building, Washington, DC 20510" }
        ],
        photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        videoTitle: "Johnathan Hayes Constituent Statement"
      }
    ];
  }
};
