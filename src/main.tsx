import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import NeuralOps from './pages/NeuralOps'

// Placeholder components for routes not yet fully implemented
const Workspace = () => <div className="p-6 text-gray-500">Workspace Module Loading...</div>
const Logs = () => <div className="p-6 text-gray-500">Activity Logs Loading...</div>
const Settings = () => <div className="p-6 text-gray-500">System Settings Loading...</div>

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="logs" element={<Logs />} />
          <Route path="ops" element={<NeuralOps />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
