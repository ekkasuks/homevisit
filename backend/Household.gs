const Household = {
  handleMembers(action, params, body) {
    switch (action) {
      case 'list':        return Utils.list(CONFIG.SHEETS.HOUSEHOLD_MEMBERS).filter(r => r.student_id === (params.student_id || body.student_id));
      case 'replace_all': return this.replaceAll(body.student_id, body.members);
      case 'delete':      return Utils.remove(CONFIG.SHEETS.HOUSEHOLD_MEMBERS, 'member_id', body.id);
      default: throw new Error('UNKNOWN_ACTION');
    }
  },

  replaceAll(studentId, members) {
    Utils.list(CONFIG.SHEETS.HOUSEHOLD_MEMBERS)
      .filter(r => r.student_id === studentId)
      .forEach(r => Utils.remove(CONFIG.SHEETS.HOUSEHOLD_MEMBERS, 'member_id', r.member_id));
    return (members || []).map(m => Utils.insert(CONFIG.SHEETS.HOUSEHOLD_MEMBERS,
      Object.assign({ member_id: Utils.uuid(), student_id: studentId }, m)));
  },

  handleStatus(action, params, body) {
    switch (action) {
      case 'get':    return Utils.list(CONFIG.SHEETS.HOUSEHOLD_STATUS).find(r => r.student_id === (params.student_id || body.student_id));
      case 'upsert': return this.upsertStatus(body.data);
      default: throw new Error('UNKNOWN_ACTION');
    }
  },

  upsertStatus(data) {
    const existing = Utils.list(CONFIG.SHEETS.HOUSEHOLD_STATUS).find(r => r.student_id === data.student_id);
    if (existing) return Utils.update(CONFIG.SHEETS.HOUSEHOLD_STATUS, 'status_id', existing.status_id, data);
    return Utils.insert(CONFIG.SHEETS.HOUSEHOLD_STATUS, Object.assign({ status_id: Utils.uuid() }, data));
  }
};
