const Visits = {
  handle(action, params, body) {
    switch (action) {
      case 'list':   return Utils.list(CONFIG.SHEETS.HOME_VISITS).filter(r => r.student_id === (params.student_id || body.student_id));
      case 'get':    return Utils.getById(CONFIG.SHEETS.HOME_VISITS, 'visit_id', params.id || body.id);
      case 'create': return Utils.insert(CONFIG.SHEETS.HOME_VISITS,
                       Object.assign({ visit_id: Utils.uuid(), created_at: Utils.now(), updated_at: Utils.now(), status: 'draft' }, body.data));
      case 'update': return Utils.update(CONFIG.SHEETS.HOME_VISITS, 'visit_id', body.id, body.data);
      case 'delete': return Utils.remove(CONFIG.SHEETS.HOME_VISITS, 'visit_id', body.id);
      default: throw new Error('UNKNOWN_ACTION');
    }
  }
};
