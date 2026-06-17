const Guardians = {
  handle(action, params, body) {
    switch (action) {
      case 'get':    return Utils.list(CONFIG.SHEETS.GUARDIANS).find(r => r.student_id === (params.student_id || body.student_id));
      case 'upsert': return this.upsert(body.data);
      case 'delete': return Utils.remove(CONFIG.SHEETS.GUARDIANS, 'guardian_id', body.id);
      default: throw new Error('UNKNOWN_ACTION');
    }
  },
  upsert(data) {
    const existing = Utils.list(CONFIG.SHEETS.GUARDIANS).find(r => r.student_id === data.student_id);
    if (existing) return Utils.update(CONFIG.SHEETS.GUARDIANS, 'guardian_id', existing.guardian_id, data);
    return Utils.insert(CONFIG.SHEETS.GUARDIANS, Object.assign({ guardian_id: Utils.uuid() }, data));
  }
};
