const Utils = {
  uuid() { return Utilities.getUuid(); },
  now() { return new Date().toISOString(); },
  sheet(name) { return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(name); },

  rowToObject(headers, row) {
    const o = {};
    headers.forEach((h, i) => { o[h] = this.parse(row[i]); });
    return o;
  },

  objectToRow(headers, obj) {
    return headers.map(h => this.stringify(obj[h]));
  },

  parse(v) {
    if (v === '' || v === null || v === undefined) return null;
    if (typeof v === 'string' && (v.startsWith('[') || v.startsWith('{'))) {
      try { return JSON.parse(v); } catch (e) { return v; }
    }
    return v;
  },

  stringify(v) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'object') return JSON.stringify(v);
    return v;
  },

  findRowIndex(sheet, idColumn, idValue) {
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const col = headers.indexOf(idColumn);
    if (col < 0) return -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][col] === idValue) return i + 1;
    }
    return -1;
  },

  list(sheetName) {
    const sh = this.sheet(sheetName);
    const data = sh.getDataRange().getValues();
    if (data.length < 2) return [];
    const headers = data[0];
    return data.slice(1).map(r => this.rowToObject(headers, r));
  },

  getById(sheetName, idCol, id) {
    return this.list(sheetName).find(r => r[idCol] === id) || null;
  },

  insert(sheetName, obj) {
    const sh = this.sheet(sheetName);
    const headers = SHEET_HEADERS[sheetName];
    sh.appendRow(this.objectToRow(headers, obj));
    return obj;
  },

  update(sheetName, idCol, id, patch) {
    const sh = this.sheet(sheetName);
    const headers = SHEET_HEADERS[sheetName];
    const rowIdx = this.findRowIndex(sh, idCol, id);
    if (rowIdx < 0) throw new Error('NOT_FOUND');
    const current = this.rowToObject(headers, sh.getRange(rowIdx, 1, 1, headers.length).getValues()[0]);
    const merged = Object.assign({}, current, patch, { updated_at: this.now() });
    sh.getRange(rowIdx, 1, 1, headers.length).setValues([this.objectToRow(headers, merged)]);
    return merged;
  },

  remove(sheetName, idCol, id) {
    const sh = this.sheet(sheetName);
    const rowIdx = this.findRowIndex(sh, idCol, id);
    if (rowIdx < 0) throw new Error('NOT_FOUND');
    sh.deleteRow(rowIdx);
    return { deleted: id };
  }
};
