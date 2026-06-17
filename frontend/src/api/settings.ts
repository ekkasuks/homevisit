import { call } from './client';

export const SettingsApi = {
  list: ()                          => call<any[]>('settings', 'list'),
  set:  (key: string, value: string) => call('settings', 'set', { key, value })
};
