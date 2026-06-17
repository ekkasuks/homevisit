import { call } from './client';

export const Visits = {
  list:   (student_id: string)       => call('home_visits', 'list', { student_id }),
  get:    (id: string)               => call('home_visits', 'get', { id }),
  create: (data: any)                => call('home_visits', 'create', { data }),
  update: (id: string, data: any)    => call('home_visits', 'update', { id, data }),
  remove: (id: string)               => call('home_visits', 'delete', { id })
};
