import { call } from './client';

export const Guardians = {
  get:    (student_id: string) => call('guardians', 'get', { student_id }),
  upsert: (data: any)          => call('guardians', 'upsert', { data })
};
