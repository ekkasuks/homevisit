import { call } from './client';

export const Photos = {
  list:   (student_id: string) => call<any[]>('photos', 'list', { student_id }),
  upload: (payload: any)       => call('photos', 'upload', payload),
  remove: (id: string)         => call('photos', 'delete', { id })
};
