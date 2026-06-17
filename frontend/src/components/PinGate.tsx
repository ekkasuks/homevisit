import { Navigate, Outlet } from 'react-router-dom';
import { isVerifiedToday } from '../store/auth';

export default function PinGate() {
  return isVerifiedToday() ? <Outlet /> : <Navigate to="/pin" replace />;
}
