/**
 * ============================================================================
 * SAVE AMERICA PETITION PLATFORM - GOOGLE APPS SCRIPT BACKEND
 * ============================================================================
 * Stores petitioner database in Google Sheets and all submitted photos & videos
 * into dedicated Google Drive folders with shareable direct viewing links.
 * 
 * Free to run on Google Drive / Google Workspace with zero monthly fees.
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Open Google Drive (drive.google.com).
 * 2. Click "+ New" -> "More" -> "Google Apps Script" (or visit script.google.com).
 * 3. Replace all code in Code.gs with this entire file.
 * 4. Click "Deploy" (top right) -> "New deployment".
 * 5. Select type: "Web app".
 * 6. Execute as: "Me" (your Google account).
 * 7. Who has access: "Anyone" (crucial for public petitioners to submit).
 * 8. Click "Deploy", review permissions, and copy the "Web app URL".
 * 9. Paste the Web app URL into the SAVE America web page settings or js/config.js!
 * ============================================================================
 */

const FOLDER_NAME = "SAVE_America_Petitions";
const SPREADSHEET_NAME = "SAVE_America_Petition_Database";

/**
 * Handles GET requests: Retrieves all petition records from Google Sheets
 */
function doGet(e) {
  try {
    const sheet = getOrCreateDatabaseSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return jsonResponse({ status: "success", count: 0, petitions: [] });
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    const petitions = rows.map((row, index) => {
      return {
        id: row[0] || `row-${index + 1}`,
        timestamp: row[1],
        name: row[2],
        zip: String(row[3]),
        city: row[4],
        state: row[5],
        lat: Number(row[6]) || 0,
        lng: Number(row[7]) || 0,
        concernTitle: row[8],
        concernText: row[9],
        representative: row[10],
        senator1: row[11],
        senator2: row[12],
        photoUrl: row[13] || null,
        videoUrl: row[14] || null
      };
    });
    
    return jsonResponse({
      status: "success",
      count: petitions.length,
      petitions: petitions
    });
    
  } catch (error) {
    return jsonResponse({ status: "error", message: error.toString() });
  }
}

/**
 * Handles POST requests: Accepts a petition submission with photo/video
 */
function doPost(e) {
  try {
    let payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      payload = e.parameter || {};
    }

    const {
      name,
      zip,
      city,
      state,
      lat,
      lng,
      selectedOption,
      representative,
      senators,
      photoBase64,
      photoFileName,
      videoBase64,
      videoFileName
    } = payload;

    if (!name || !zip) {
      return jsonResponse({ status: "error", message: "Name and Zip Code are required." });
    }

    // 1. Ensure Google Drive Folders exist
    const rootFolder = getOrCreateFolder(FOLDER_NAME);
    const photosFolder = getOrCreateSubFolder(rootFolder, "Constituent_Photos");
    const videosFolder = getOrCreateSubFolder(rootFolder, "Constituent_Videos");

    const petitionerId = "SAV-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000);
    const timestamp = new Date().toISOString();

    // 2. Process and save Photo to Google Drive (if submitted)
    let photoDriveUrl = "";
    if (photoBase64 && photoBase64.indexOf("base64,") !== -1) {
      try {
        const photoData = photoBase64.split("base64,")[1];
        const contentType = photoBase64.split(";")[0].split(":")[1] || "image/jpeg";
        const cleanExt = contentType.includes("png") ? "png" : "jpg";
        const safeName = `${petitionerId}_${name.replace(/[^a-zA-Z0-9]/g, "_")}.${cleanExt}`;
        
        const photoBlob = Utilities.newBlob(Utilities.base64Decode(photoData), contentType, safeName);
        const photoFile = photosFolder.createFile(photoBlob);
        photoFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        photoDriveUrl = photoFile.getUrl();
      } catch (err) {
        Logger.log("Error saving photo: " + err.toString());
      }
    }

    // 3. Process and save Video to Google Drive (if submitted)
    let videoDriveUrl = "";
    if (videoBase64 && videoBase64.indexOf("base64,") !== -1) {
      try {
        const videoData = videoBase64.split("base64,")[1];
        const contentType = videoBase64.split(";")[0].split(":")[1] || "video/mp4";
        const cleanExt = contentType.includes("webm") ? "webm" : "mp4";
        const safeName = `${petitionerId}_video_${name.replace(/[^a-zA-Z0-9]/g, "_")}.${cleanExt}`;
        
        const videoBlob = Utilities.newBlob(Utilities.base64Decode(videoData), contentType, safeName);
        const videoFile = videosFolder.createFile(videoBlob);
        videoFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        videoDriveUrl = videoFile.getUrl();
      } catch (err) {
        Logger.log("Error saving video: " + err.toString());
      }
    }

    // 4. Save Record to Google Sheet Database
    const sheet = getOrCreateDatabaseSheet();
    const repName = representative ? `${representative.name} (${representative.party})` : "N/A";
    const sen1Name = senators && senators[0] ? `${senators[0].name} (${senators[0].party})` : "N/A";
    const sen2Name = senators && senators[1] ? `${senators[1].name} (${senators[1].party})` : "N/A";

    const newRow = [
      petitionerId,
      timestamp,
      name,
      zip,
      city || "",
      state || "",
      lat || 0,
      lng || 0,
      selectedOption ? selectedOption.title : "General Petition",
      selectedOption ? selectedOption.text : "",
      repName,
      sen1Name,
      sen2Name,
      photoDriveUrl,
      videoDriveUrl
    ];

    sheet.appendRow(newRow);

    return jsonResponse({
      status: "success",
      message: "Petition successfully recorded to Google Drive & Sheets!",
      petitionerId: petitionerId,
      photoDriveUrl: photoDriveUrl,
      videoDriveUrl: videoDriveUrl,
      sheetUrl: sheet.getParent().getUrl()
    });

  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

/**
 * Locate or create the database Google Spreadsheet
 */
function getOrCreateDatabaseSheet() {
  const rootFolder = getOrCreateFolder(FOLDER_NAME);
  const files = rootFolder.getFilesByName(SPREADSHEET_NAME);
  let spreadsheet;

  if (files.hasNext()) {
    spreadsheet = SpreadsheetApp.open(files.next());
  } else {
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    const driveFile = DriveApp.getFileById(spreadsheet.getId());
    rootFolder.addFile(driveFile);
    DriveApp.getRootFolder().removeFile(driveFile);
  }

  const sheet = spreadsheet.getActiveSheet();
  
  // Create headers if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Petitioner ID",
      "Timestamp",
      "Name",
      "Zip Code",
      "City",
      "State",
      "Latitude",
      "Longitude",
      "Concern Category",
      "Petition Text Option",
      "U.S. House Representative",
      "U.S. Senator 1",
      "U.S. Senator 2",
      "Photo Drive Link",
      "Video Drive Link"
    ]);
    
    // Style header row
    const headerRange = sheet.getRange(1, 1, 1, 15);
    headerRange.setBackground("#0A192F");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
  }

  return sheet;
}

/**
 * Locate or create a folder in user's Google Drive
 */
function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  const folder = DriveApp.createFolder(folderName);
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return folder;
}

/**
 * Locate or create a subfolder within a parent folder
 */
function getOrCreateSubFolder(parentFolder, subFolderName) {
  const subFolders = parentFolder.getFoldersByName(subFolderName);
  if (subFolders.hasNext()) {
    return subFolders.next();
  }
  const subFolder = parentFolder.createFolder(subFolderName);
  subFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return subFolder;
}

/**
 * Utility for formatting JSON response with CORS headers
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
