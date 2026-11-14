# Google Drive Backend Integration Guide for "SAVE America"

This petition platform is built to store all petitioner data, photos, and videos **directly in your own Google Drive** using Google Apps Script and Google Sheets.

## Why this architecture?
- **Zero cost / 100% Free**: Google provides 15 GB of free Drive storage.
- **Direct Ownership**: You own the Google Sheet database and Google Drive media folder.
- **No Complex Server Required**: No AWS, Firebase, or SQL database setup needed.

---

## 3-Minute Quick Setup

### Step 1: Open Google Apps Script
1. Go to [https://script.google.com](https://script.google.com) (make sure you are signed into your Google account).
2. Click **"+ New project"** in the top-left corner.
3. Rename the project at the top to: `SAVE America Petition Backend`.

### Step 2: Paste the Code
1. Delete any boilerplate code in `Code.gs`.
2. Copy the entire content of [`Code.gs`](file:///c:/Users/greg_/Downloads/AG%20Project%20-%20SAVE/google-drive-backend/Code.gs) from this folder and paste it into the editor.
3. Click the floppy disk **Save** icon (or press `Ctrl+S`).

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button (top right) -> select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the settings:
   - **Description**: `SAVE America Public Petition Webhook`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: This allows petitioners from around the USA to submit without needing your Google login)*.
4. Click **Deploy**.
5. Google will ask you to **Authorize access**:
   - Click *Authorize access*.
   - Select your Google account.
   - Click *Advanced* -> *Go to SAVE America Petition Backend (unsafe)*.
   - Click *Allow*.
6. Google will provide a **Web app URL** that looks like:
   `https://script.google.com/macros/s/AKfycbx.../exec`
7. Copy this URL!

### Step 4: Connect to the Web Page
You have two easy ways to activate it:
- **Option A (In the Web App UI)**: Click the **"Google Drive Sync"** button in the header of the website, paste your URL, and click **Save**.
- **Option B (In Code)**: Open `js/config.js` and set:
  ```javascript
  GOOGLE_APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx.../exec",
  ```

---

## What Happens When Someone Signs?
1. The petitioner's name, zip code, city, state, and chosen concern text are recorded as a new row in a newly created Google Sheet named **`SAVE_America_Petition_Database`**.
2. Any photo submitted (under 2 MB) is saved to the **`SAVE_America_Petitions/Constituent_Photos/`** folder in your Google Drive.
3. Any video submitted (under 10 MB) is saved to the **`SAVE_America_Petitions/Constituent_Videos/`** folder in your Google Drive.
4. The direct Google Drive view links are inserted into the Google Sheet columns automatically.
