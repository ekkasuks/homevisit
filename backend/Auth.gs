const Auth = {
  check(pin) { return String(pin) === CONFIG.DAILY_PIN; },
  handle(action, params, body) {
    if (action === 'verify_pin') {
      const ok = this.check(body.pin || params.pin);
      return { verified: ok, date: new Date().toISOString().slice(0, 10) };
    }
    throw new Error('UNKNOWN_AUTH_ACTION');
  }
};
