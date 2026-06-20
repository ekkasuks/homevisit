const Photos = {
  handle(action, params, body) {
    switch (action) {
      case 'list':   return Utils.list(CONFIG.SHEETS.PHOTOS).filter(r => r.student_id === (params.student_id || body.student_id));
      case 'upload': return this.upload(body);
      case 'delete': return this.remove(body.id);
      case 'fetch':  return this.fetchAsBase64(params.id || body.id);
      default: throw new Error('UNKNOWN_ACTION');
    }
  },

  ensureFolder(parent, name) {
    const it = parent.getFoldersByName(name);
    return it.hasNext() ? it.next() : parent.createFolder(name);
  },

  resolveTarget(photo_type, student_id, visit_id) {
    const root = DriveApp.getFolderById(CONFIG.DRIVE_ROOT_FOLDER_ID);
    const student = this.ensureFolder(root, student_id);
    if (photo_type === 'student_portrait') return this.ensureFolder(student, 'portrait');
    const visits = this.ensureFolder(student, 'visits');
    return this.ensureFolder(visits, visit_id || 'unfiled');
  },

  upload(body) {
    const { student_id, visit_id, photo_type, filename, mime_type, base64_data } = body;
    const folder = this.resolveTarget(photo_type, student_id, visit_id);

    if (photo_type !== 'student_portrait' && visit_id) {
      const existing = Utils.list(CONFIG.SHEETS.PHOTOS)
        .filter(p => p.visit_id === visit_id && p.photo_type === photo_type);
      existing.forEach(old => this.remove(old.photo_id));
    }

    const bytes = Utilities.base64Decode(base64_data);
    const blob  = Utilities.newBlob(bytes, mime_type, photo_type + '_' + Date.now() + '_' + filename);
    const file  = folder.createFile(blob);
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {
      Logger.log('setSharing skipped: ' + shareErr.message);
    }

    return Utils.insert(CONFIG.SHEETS.PHOTOS, {
      photo_id: Utils.uuid(),
      student_id: student_id,
      visit_id: visit_id || '',
      photo_type: photo_type,
      drive_file_id: file.getId(),
      drive_url: 'https://drive.google.com/uc?id=' + file.getId(),
      uploaded_at: Utils.now(),
      uploaded_by: 'pin_user',
      file_size_bytes: bytes.length,
      mime_type: mime_type
    });
  },

  fetchAsBase64(fileId) {
    const blob = DriveApp.getFileById(fileId).getBlob();
    return {
      mime_type: blob.getContentType(),
      base64: Utilities.base64Encode(blob.getBytes())
    };
  },

  remove(id) {
    const photo = Utils.getById(CONFIG.SHEETS.PHOTOS, 'photo_id', id);
    if (photo && photo.drive_file_id) {
      try { DriveApp.getFileById(photo.drive_file_id).setTrashed(true); } catch(e){}
    }
    return Utils.remove(CONFIG.SHEETS.PHOTOS, 'photo_id', id);
  }
};
