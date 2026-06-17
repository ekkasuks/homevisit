import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

const nav = [
  { to: '/',         label: 'แดชบอร์ด',       icon: LayoutDashboard },
  { to: '/students', label: 'รายชื่อนักเรียน', icon: Users },
  { to: '/reports',  label: 'รายงาน',         icon: BarChart3 },
  { to: '/settings', label: 'ตั้งค่า',        icon: Settings }
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const logout = useAuth(s => s.logout);
  const navTo = useNavigate();

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className={`${open ? 'block' : 'hidden'} lg:block fixed lg:static z-30 w-64 h-full bg-white border-r border-slate-200`}>
        <div className="p-4 border-b font-bold text-brand-700">ระบบเยี่ยมบ้าน</div>
        <nav className="p-2 space-y-1">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} end onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-brand-50 text-brand-700 font-medium' : 'hover:bg-slate-100'}`}>
              <n.icon size={18} />{n.label}
            </NavLink>
          ))}
          <button onClick={() => { logout(); navTo('/pin'); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
            <LogOut size={18} /> ออกจากระบบ
          </button>
        </nav>
      </aside>
      <main className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3 z-20">
          <button onClick={() => setOpen(!open)} aria-label="menu"><Menu /></button>
          <span className="font-bold">ระบบเยี่ยมบ้าน</span>
        </header>
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
