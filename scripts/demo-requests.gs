/**
 * Google Apps Script for the "Book a free demo" form on www.zutok.in.
 *
 * Every form submission becomes one row in a "Demo requests" tab of the Google Sheet this script is attached to.
 * The tab and its header row are created on the first submission, so nothing else in the sheet is touched.
 *
 * Setup (once):
 *   1. Open the Google Sheet, then Extensions > Apps Script.
 *   2. Replace everything in Code.gs with this file and click Save.
 *   3. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Click Deploy and allow access.
 *   4. Copy the Web app URL (ends in /exec) into `demoEndpoint` in src/lib/site.ts, then rebuild and deploy the site.
 * After editing this script later, use Deploy > Manage deployments > Edit > Version: New version, so the URL stays the same.
 */

const SHEET_NAME = "Demo requests";
const HEADERS = ["Submitted at", "Name", "Business", "Phone / WhatsApp", "Interested in", "Message", "Page"];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Bots fill the hidden "website" field; people never see it. Pretend it worked and store nothing.
  if (p.website) return json({ ok: true });

  const name = clean(p.name, 120);
  const phone = clean(p.phone, 40);
  if (!name || !phone) return json({ ok: false, error: "Name and phone are required." });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      name,
      clean(p.business, 160),
      phone,
      clean(p.interests, 120),
      clean(p.message, 2000),
      clean(p.page, 300),
    ]);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

// Opening the URL in a browser shows this, which is a quick way to check the deployment works.
function doGet() {
  return json({ ok: true, service: "Zutok demo requests" });
}

/** Trims and shortens a value, and stops text like "=SUM(...)" or "+91..." from being read as a formula. */
function clean(value, max) {
  const text = String(value == null ? "" : value).trim().slice(0, max);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
