import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Shell() {
  return (
    <div className="min-h-screen bg-bg text-gray-100 font-sans selection:bg-accent/30 selection:text-white">
      <Sidebar />
      <Header />
      
      <main className="pl-64 pt-16 min-h-screen">
        <div className="p-6 max-w-[1920px] mx-auto animate-in fade-in zoom-in-95 duration-300 slide-in-from-bottom-4">
          <Outlet />
        </div>
      </main>

      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
