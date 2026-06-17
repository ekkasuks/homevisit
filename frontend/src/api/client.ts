const API = import.meta.env.VITE_API_URL as string;
const PIN = () => localStorage.getItem('pin') || '';

export async function call<T = any>(resource: string, action: string, payload: any = {}): Promise<T> {
  if (!API) throw new Error('VITE_API_URL not configured');
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ pin: PIN(), resource, action, ...payload })
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || 'API_ERROR');
  return json.data as T;
}
