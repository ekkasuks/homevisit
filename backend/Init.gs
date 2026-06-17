function initializeDatabase() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  Object.keys(SHEET_HEADERS).forEach(name => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    sh.clear();
    sh.getRange(1, 1, 1, SHEET_HEADERS[name].length).setValues([SHEET_HEADERS[name]]);
    sh.setFrozenRows(1);
  });
  const settings = ss.getSheetByName(CONFIG.SHEETS.SETTINGS);
  [
    ['daily_pin', '127'],
    ['current_semester', '1'],
    ['current_academic_year', '2569'],
    ['school_name', ''],
    ['school_affiliation', ''],
    ['drive_root_folder_id', CONFIG.DRIVE_ROOT_FOLDER_ID],
    ['pdf_template_file_id', CONFIG.PDF_TEMPLATE_FILE_ID],
    ['form_version', 'ฉบับปรับปรุง 6 มีนาคม 2569']
  ].forEach(r => settings.appendRow(r));
  Logger.log('Database initialized.');
}
