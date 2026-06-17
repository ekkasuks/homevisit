const SettingsSvc = {
  handle(action, params, body) {
    switch (action) {
      case 'list': return Utils.list(CONFIG.SHEETS.SETTINGS);
      case 'get':  return Utils.list(CONFIG.SHEETS.SETTINGS).find(r => r.key === (params.key || body.key));
      case 'set': {
        const existing = Utils.list(CONFIG.SHEETS.SETTINGS).find(r => r.key === body.key);
        if (existing) return Utils.update(CONFIG.SHEETS.SETTINGS, 'key', body.key, { value: body.value });
        return Utils.insert(CONFIG.SHEETS.SETTINGS, { key: body.key, value: body.value });
      }
      default: throw new Error('UNKNOWN_ACTION');
    }
  }
};
