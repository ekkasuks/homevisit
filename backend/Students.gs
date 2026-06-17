const Students = {
  handle(action, params, body) {
    switch (action) {
      case 'list':   return this.list();
      case 'get':    return this.get(params.id || body.id);
      case 'create': return this.create(body.data);
      case 'update': return this.update(body.id, body.data);
      case 'delete': return this.remove(body.id);
      case 'full':   return this.full(params.id || body.id);
      default: throw new Error('UNKNOWN_ACTION');
    }
  },

  list() { return Utils.list(CONFIG.SHEETS.STUDENTS); },
  get(id) { return Utils.getById(CONFIG.SHEETS.STUDENTS, 'student_id', id); },

  create(data) {
    const obj = Object.assign({
      student_id: Utils.uuid(),
      created_at: Utils.now(),
      updated_at: Utils.now(),
      created_by: data.created_by || 'pin_user'
    }, data);
    return Utils.insert(CONFIG.SHEETS.STUDENTS, obj);
  },

  update(id, data) { return Utils.update(CONFIG.SHEETS.STUDENTS, 'student_id', id, data); },

  remove(id) {
    const tables = [
      { sheet: CONFIG.SHEETS.GUARDIANS,         idCol: 'guardian_id' },
      { sheet: CONFIG.SHEETS.HOUSEHOLD_MEMBERS, idCol: 'member_id' },
      { sheet: CONFIG.SHEETS.HOUSEHOLD_STATUS,  idCol: 'status_id' },
      { sheet: CONFIG.SHEETS.HOME_VISITS,       idCol: 'visit_id' },
      { sheet: CONFIG.SHEETS.PHOTOS,            idCol: 'photo_id' }
    ];
    tables.forEach(t => {
      Utils.list(t.sheet)
        .filter(r => r.student_id === id)
        .forEach(r => Utils.remove(t.sheet, t.idCol, r[t.idCol]));
    });
    return Utils.remove(CONFIG.SHEETS.STUDENTS, 'student_id', id);
  },

  full(id) {
    return {
      student:           this.get(id),
      guardian:          Utils.list(CONFIG.SHEETS.GUARDIANS).find(r => r.student_id === id),
      household_members: Utils.list(CONFIG.SHEETS.HOUSEHOLD_MEMBERS).filter(r => r.student_id === id),
      household_status:  Utils.list(CONFIG.SHEETS.HOUSEHOLD_STATUS).find(r => r.student_id === id),
      home_visits:       Utils.list(CONFIG.SHEETS.HOME_VISITS).filter(r => r.student_id === id),
      photos:            Utils.list(CONFIG.SHEETS.PHOTOS).filter(r => r.student_id === id)
    };
  }
};
