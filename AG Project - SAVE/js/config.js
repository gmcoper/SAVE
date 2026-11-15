/**
 * SAVE AMERICA PETITION PLATFORM - CONFIGURATION
 * 
 * Configure file limits, Google Drive integration, and petition concerns.
 */

const CONFIG = {
  // File size limits in bytes
  MAX_PHOTO_SIZE_BYTES: 2 * 1024 * 1024,   // 2 MB max photo
  MAX_VIDEO_SIZE_BYTES: 10 * 1024 * 1024,  // 10 MB max video

  // ── Google Civic Information API Key ──────────────────────────────
  // Required for accurate congressional-district and representative
  // lookup from a 5-digit zip code.  Obtain a free key at:
  //   https://console.cloud.google.com/apis/credentials
  // Then enable the "Google Civic Information API" in your project.
  // Without this key the platform still works but falls back to
  // state-level representative matching (Senators will be correct;
  // the House representative may be approximate).
  GOOGLE_CIVIC_API_KEY: "AIzaSyCfFme7BdU1RvO9rFSsbxitkhLv5VBKEsw",

  // Google Drive & Sheets Integration Endpoint
  // Users can paste their published Google Apps Script Web App URL here
  // or enter it directly via the in-app "Settings / Google Drive" dialog.
  GOOGLE_APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbz-QrRjOWcLQVx4WcV6dCbXsYvcaYkBVbFd1oMflQVF49wX-Lyv1U3KoeamIMIwwQpbag/exec", 

  // Set to true to preload 10 demonstration signers, or false to start with an empty/clean slate
  ENABLE_SAMPLE_DATA: false,

  // Local storage keys
  STORAGE_KEY_PETITIONS: "save_america_petitions_v1",
  STORAGE_KEY_CONFIG: "save_america_gdrive_endpoint",

  // Curated Patriotic Petition Concerns (Pre-written text options)
  PETITION_OPTIONS: [
    {
      id: "opt-border",
      title: "Border Security & National Sovereignty",
      badge: "Sovereignty & Security",
      icon: "shield-halved",
      text: "I petition my representatives to enforce all United States immigration laws, ensure full operational control and completion of our national borders, halt unlawful entries, and prioritize the safety, law enforcement, and sovereignty of the American people."
    },
    {
      id: "opt-economy",
      title: "Economic Liberty & Halting Inflation",
      badge: "Economic Revival",
      icon: "chart-line",
      text: "I petition my representatives to rein in reckless federal spending, cut burdensome federal regulations, promote American energy independence to lower the cost of living, and enact fiscal policies that protect working families from crippling inflation."
    },
    {
      id: "opt-constitution",
      title: "Defending the Constitution & Free Speech",
      badge: "Constitutional Rights",
      icon: "scroll",
      text: "I petition my representatives to fiercely protect our God-given liberties guaranteed by the U.S. Constitution—specifically the First Amendment rights of free expression, religious liberty, and assembly, and the Second Amendment right to keep and bear arms."
    },
    {
      id: "opt-veterans",
      title: "Honoring Veterans & Military Readiness",
      badge: "Veterans & Heroes",
      icon: "medal",
      text: "I petition my representatives to ensure world-class healthcare and earned benefits for our military veterans and first responders, end partisan social experimentation within our armed forces, and restore decisive peace through strength."
    },
    {
      id: "opt-energy",
      title: "Energy Dominance & American Industry",
      badge: "Energy Independence",
      icon: "bolt",
      text: "I petition my representatives to end restrictions on domestic oil, natural gas, and mineral production, revitalize American manufacturing supply chains, and guarantee that the United States is never dependent on hostile foreign adversaries for our energy needs."
    },
    {
      id: "opt-heritage",
      title: "Civic Excellence & American Heritage",
      badge: "American Heritage",
      icon: "flag-usa",
      text: "I petition my representatives to champion patriotic education in our schools, respect parental rights in education, celebrate American exceptionalism and constitutional history, and foster civic unity under our shared founding principles."
    }
  ]
};

// Auto-retrieve saved Google Apps Script URL if stored in browser
try {
  const savedEndpoint = localStorage.getItem(CONFIG.STORAGE_KEY_CONFIG);
  if (savedEndpoint) {
    CONFIG.GOOGLE_APPS_SCRIPT_URL = savedEndpoint;
  }
} catch (e) {
  console.warn("Storage access restricted for config URL", e);
}
