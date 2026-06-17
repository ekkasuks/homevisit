import { call } from './client';

export const Members = {
  list:       (student_id: string)            => call('household_members', 'list', { student_id }),
  replaceAll: (student_id: string, members: any[]) =>
    call('household_members', 'replace_all', { student_id, members })
};

export const Status = {
  get:    (student_id: string) => call('household_status', 'get', { student_id }),
  upsert: (data: any)          => call('household_status', 'upsert', { data })
};
