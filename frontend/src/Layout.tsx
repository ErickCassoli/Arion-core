import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex w-full h-screen bg-bg font-sans text-gray-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-hidden relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5">
          <div className="absolute inset-0 bg-bg opacity-90 pointer-events-none"></div>
          <div className="relative h-full overflow-y-auto">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
