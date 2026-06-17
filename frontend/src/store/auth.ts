import { create } from 'zustand';
import { todayISO } from '../lib/thai';

const PIN = import.meta.env.VITE_DAILY_PIN || '127';

interface AuthState {
  verifiedDate: string | null;
  verify: (pin: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  verifiedDate: localStorage.getItem('verifiedDate'),
  verify(pin) {
    if (pin === PIN) {
      const d = todayISO();
      localStorage.setItem('verifiedDate', d);
      localStorage.setItem('pin', pin);
      set({ verifiedDate: d });
      return true;
    }
    return false;
  },
  logout() {
    localStorage.removeItem('verifiedDate');
    localStorage.removeItem('pin');
    set({ verifiedDate: null });
  }
}));

export const isVerifiedToday = (): boolean =>
  (localStorage.getItem('verifiedDate') || '') === todayISO();
