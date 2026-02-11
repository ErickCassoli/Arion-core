import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Agents from './pages/Agents'
import NeuralOps from './pages/NeuralOps'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

import Workspace from './pages/Workspace'
import Logs from './pages/Logs'
import { ToastProvider } from './contexts/ToastContext'

// Placeholder components for routes not yet fully implemented
const Settings = () => <div className="p-6 text-gray-500">System Settings Loading...</div>

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "workspace", element: <Workspace /> },
      { path: "tasks", element: <Tasks /> },
      { path: "agents", element: <Agents /> },
      { path: "ops", element: <NeuralOps /> },
      { path: "logs", element: <Logs /> },
      { path: "settings", element: <Settings /> },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
)
