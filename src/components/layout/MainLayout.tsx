import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Sidebar />
      <main className="lg:pl-64 min-h-screen transition-all duration-200 ease-in-out">
        <div className="container mx-auto p-4 lg:p-8 space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
