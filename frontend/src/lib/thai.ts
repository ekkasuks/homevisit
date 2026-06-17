export function toBuddhistYear(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const by = d.getFullYear() + 543;
  return `${d.getDate()}/${d.getMonth() + 1}/${by}`;
}

export function thNumber(n: any): string {
  if (n === null || n === undefined || n === '') return '';
  const num = Number(n);
  if (isNaN(num)) return String(n);
  return num.toLocaleString('th-TH');
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
