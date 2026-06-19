import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PinGate from './components/PinGate';
import Layout from './components/Layout';
import PinPage from './pages/PinPage';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentDetail from './pages/StudentDetail';
import HomeVisitForm from './pages/HomeVisitForm';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';
import ImportStudents from './pages/ImportStudents';

const router = createBrowserRouter([
  { path: '/pin', element: <PinPage /> },
  {
    element: <PinGate />,
    children: [{
      element: <Layout />,
      children: [
        { path: '/',                          element: <Dashboard /> },
        { path: '/students',                  element: <StudentList /> },
        { path: '/students/new',              element: <StudentDetail /> },
        { path: '/students/:id',              element: <StudentDetail /> },
        { path: '/students/:id/visit/new',    element: <HomeVisitForm /> },
        { path: '/students/:id/visit/:vid',   element: <HomeVisitForm /> },
        { path: '/import',                    element: <ImportStudents /> },
        { path: '/reports',                   element: <Reports /> },
        { path: '/settings',                  element: <SettingsPage /> }
      ]
    }]
  }
], { basename: import.meta.env.BASE_URL });

export default function AppRouter() { return <RouterProvider router={router} />; }
