import { call } from './client';

export const Students = {
  list:   ()                            => call<any[]>('students', 'list'),
  get:    (id: string)                  => call('students', 'get', { id }),
  full:   (id: string)                  => call('students', 'full', { id }),
  create: (data: any)                   => call('students', 'create', { data }),
  update: (id: string, data: any)       => call('students', 'update', { id, data }),
  remove: (id: string)                  => call('students', 'delete', { id })
};
