const SPREADSHEET_NAME = '2026_員工旅遊';
const SHEET_NAME = '報名資料';
const HEADERS = ['姓名', 'Email', '單位', '電話', '職稱', '報名時間'];

function setup() {
  const properties = PropertiesService.getScriptProperties();
  const existingId = properties.getProperty('SPREADSHEET_ID');
  const spreadsheet = existingId
    ? SpreadsheetApp.openById(existingId)
    : SpreadsheetApp.create(SPREADSHEET_NAME);

  spreadsheet.rename(SPREADSHEET_NAME);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
    sheet.setName(SHEET_NAME);
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange('D:D').setNumberFormat('@');
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  properties.setProperty('SPREADSHEET_ID', spreadsheet.getId());

  return spreadsheet.getUrl();
}

function doPost(event) {
  const data = event && event.parameter ? event.parameter : {};
  const required = ['name', 'email', 'phone'];
  if (required.some((key) => !String(data[key] || '').trim())) {
    return jsonResponse({ ok: false, message: '缺少必填欄位' });
  }

  const email = String(data.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ ok: false, message: 'Email 格式錯誤' });
  }

  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) setup();
  const sheet = SpreadsheetApp.openById(
    PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')
  ).getSheetByName(SHEET_NAME);
  const nextRow = sheet.getLastRow() + 1;

  sheet.getRange(nextRow, 4).setNumberFormat('@');
  sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([[
    String(data.name).trim(),
    email,
    String(data.department || '').trim(),
    String(data.phone).trim(),
    String(data.title || '').trim(),
    new Date(),
  ]]);

  return jsonResponse({ ok: true });
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}