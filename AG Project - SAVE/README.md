# SAVE America — National Citizen Petition Platform

An inspiring, patriotic web platform for American citizens to petition the United States Congress. Petitioners can choose from curated pre-written concerns, submit an optional photo (up to 2 MB) and video message (up to 10 MB), locate their federal representatives in the House and Senate in real-time, view their official Washington, D.C. mailing addresses, and see their voice pinned to an interactive national map.

---

## 🌟 Key Features

### 1. Patriotic American Theme ("SAVE America")
- Presidential deep navy blue, bold crimson red, and gold-trimmed aesthetic with subtle stars, seals, and typography.
- Built for all devices (desktops, laptops, tablets, and smartphones).

### 2. Petition Submission Form
- **Full Name & Zip Code Collection**: Validates 5-digit US zip codes.
- **Real-Time Federal Representation Lookup**:
  - Automatically identifies the petitioner's **U.S. House Representative** and **two U.S. Senators**.
  - Displays the official Capitol Hill Washington, D.C. mailing address (Rayburn, Longworth, Cannon, Dirksen, Russell, or Hart buildings).
  - One-click **"Copy Address"** button for quick mailing labels.
  - **"Print Official Written Petition"**: Generates a formal, formatted constituent grievance letter ready to fold, stamp, and mail directly to their representatives!
- **Curated Pre-written Concerns**:
  - Border Security & National Sovereignty
  - Economic Liberty, Lower Taxes & Halting Inflation
  - Defending the Constitution & Free Speech
  - Honoring Veterans, First Responders & Military Readiness
  - Energy Independence & American Manufacturing
  - Civic Excellence & Preserving American Heritage
- **Media Upload Limits**:
  - **Photo**: Optional, client-side & server-side enforced limit of **2 MB** with instant preview.
  - **Video**: Optional, client-side & server-side enforced limit of **10 MB** with instant HTML5 playback preview.

### 3. Interactive USA Map & National Counter
- **Live Petitioner Counter**: Dynamically tracks total verified signers, states mobilized (50/50), and congressional districts represented.
- **Interactive USA Map (Leaflet.js)**:
  - Custom patriotic pins marking petitioner locations across all 50 states.
  - Interactive popups showing the petitioner's name, city/state, chosen concern, and photo/video badges.
  - Filter pins by concern category or view only those with video statements.
- **Recent Signers Live Feed**: Real-time ticker showing fellow patriots standing up across the country.

### 4. Congressional Directory & Constituent Voices Page (`representatives.html`)
- Dedicated page listing all federal representatives (100 U.S. Senators + U.S. House members).
- Shows how many constituents have signed under each representative.
- Filter and search by:
  - Official's name
  - Chamber (U.S. Senate or U.S. House)
  - State (all 50 states)
  - Sort by most constituent signatures
- **Constituent Petitions Drawer**:
  - Detailed drill-down for each representative displaying every constituent who signed:
    - Constituent picture (if submitted)
    - Full Name and Zip Code
    - Selected pre-written text option
    - Direct link & video player modal for constituent video statements (if submitted)

### 5. Google Drive & Google Sheets Database Integration
- All submitted data is capable of storing directly in your **Google Drive**:
  - Photos saved to `SAVE_America_Petitions/Constituent_Photos/` in Google Drive.
  - Videos saved to `SAVE_America_Petitions/Constituent_Videos/` in Google Drive.
  - Database saved to `SAVE_America_Petition_Database` in Google Sheets.
  - Front-end connects via a lightweight Google Apps Script Web App webhook.
- Also includes a built-in offline mode with local storage, instant test data, and one-click **CSV/JSON Database Export**.

---

## 🚀 Quick Start (Running Locally)

### Option 1: One-Click Launcher (Windows)
Double-click `start-server.bat` in this folder, or open PowerShell and run:
```powershell
.\start-server.ps1
```
This opens the petition platform at `http://localhost:8080` in your web browser.

### Option 2: Direct File Open
You can also directly double-click [`index.html`](file:///c:/Users/greg_/Downloads/AG%20Project%20-%20SAVE/index.html) to open the application in Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## 📁 Project Structure

```
AG Project - SAVE/
├── index.html                   # Main page (Hero, Sign Form, Map, Counter, Ticker)
├── representatives.html         # Congressional Directory & Constituent Voices
├── css/
│   └── style.css                # Patriotic design system, responsive styles, animations
├── js/
│   ├── config.js                # Configuration, file limits, concern text options
│   ├── data-representatives.js  # 100 U.S. Senators + House Reps with D.C. mailing addresses
│   ├── data-zipcodes.js         # 5-digit Zip Code geocoding & congressional district resolver
│   ├── gdrive-client.js         # Google Drive sync, file validator, and database client
│   ├── app.js                   # Main page controller, Leaflet map, form submissions
│   └── reps-page.js             # Representatives page controller, search & constituent drawer
├── google-drive-backend/
│   ├── Code.gs                  # Turn-key Google Apps Script for Google Drive & Google Sheets
│   └── README-GDRIVE.md         # 3-minute setup guide for Google Drive
├── start-server.ps1             # Native PowerShell HTTP server (zero install required)
├── start-server.bat             # 1-click Windows shortcut
└── README.md                    # Documentation
```

---

## ☁️ Google Drive Setup (3 Minutes)

Detailed instructions with steps are provided in [`google-drive-backend/README-GDRIVE.md`](file:///c:/Users/greg_/Downloads/AG%20Project%20-%20SAVE/google-drive-backend/README-GDRIVE.md).

1. Visit [script.google.com](https://script.google.com) and create a **New project**.
2. Paste the contents of `google-drive-backend/Code.gs`.
3. Click **Deploy** -> **New deployment** -> Select **Web app** -> Who has access: **Anyone**.
4. Copy your Web App URL.
5. In the website, click **"Google Drive Sync"** in the top navigation, paste your URL, and click **Save**. All submissions, photos, and videos will now save directly to your Google Drive!
