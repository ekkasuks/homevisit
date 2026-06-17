# API Reference

Base URL: `https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec`

Method: `POST` (Content-Type: `text/plain` to avoid CORS preflight)

## Request envelope

```json
{ "pin": "127", "resource": "students", "action": "list", "id": "...", "data": {...} }
```

## Response envelope

```json
{ "ok": true, "data": ... }
{ "ok": false, "error": "INVALID_PIN" }
```

## Resources / Actions

| Resource | Action | Body keys | Returns |
|---|---|---|---|
| `auth` | `verify_pin` | `pin` | `{ verified, date }` |
| `students` | `list` | — | `Student[]` |
| `students` | `get` | `id` | `Student` |
| `students` | `full` | `id` | bundle |
| `students` | `create` | `data` | `Student` |
| `students` | `update` | `id, data` | `Student` |
| `students` | `delete` | `id` | cascade delete |
| `guardians` | `get` / `upsert` / `delete` | … | `Guardian` |
| `household_members` | `list` / `replace_all` / `delete` | `student_id, members[]` | `Member[]` |
| `household_status` | `get` / `upsert` | … | `Status` |
| `home_visits` | `list` / `get` / `create` / `update` / `delete` | … | `Visit` |
| `photos` | `list` / `upload` / `delete` | `student_id, visit_id, photo_type, filename, mime_type, base64_data` | `Photo` |
| `settings` | `list` / `get` / `set` | `key, value` | `Setting[]` |

## Error codes
- `INVALID_PIN`
- `UNKNOWN_RESOURCE`
- `UNKNOWN_ACTION`
- `NOT_FOUND`
