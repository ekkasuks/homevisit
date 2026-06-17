function doGet(e)  { return handleRequest(e, 'GET'); }
function doPost(e) { return handleRequest(e, 'POST'); }

function handleRequest(e, method) {
  try {
    const params = e.parameter || {};
    const body = (method === 'POST' && e.postData && e.postData.contents)
      ? JSON.parse(e.postData.contents) : {};
    const action = params.action || body.action;
    const resource = params.resource || body.resource;

    if (action !== 'verify_pin' && !Auth.check(params.pin || body.pin)) {
      return jsonResponse({ ok: false, error: 'INVALID_PIN' });
    }

    let result;
    switch (resource) {
      case 'students':           result = Students.handle(action, params, body); break;
      case 'guardians':          result = Guardians.handle(action, params, body); break;
      case 'household_members':  result = Household.handleMembers(action, params, body); break;
      case 'household_status':   result = Household.handleStatus(action, params, body); break;
      case 'home_visits':        result = Visits.handle(action, params, body); break;
      case 'photos':             result = Photos.handle(action, params, body); break;
      case 'settings':           result = SettingsSvc.handle(action, params, body); break;
      case 'auth':               result = Auth.handle(action, params, body); break;
      default: return jsonResponse({ ok: false, error: 'UNKNOWN_RESOURCE' });
    }
    return jsonResponse({ ok: true, data: result });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message, stack: err.stack });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
