import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from '../Topbar';

export default function MainLayout() {
  return (
    <div className="flex bg-bg h-screen w-screen overflow-hidden text-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-auto bg-bg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
