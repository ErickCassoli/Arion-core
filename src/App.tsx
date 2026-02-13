import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/layout/Shell';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import AgentHive from './pages/AgentHive';
import NeuralLink from './pages/NeuralLink';
import Workspace from './pages/Workspace';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="hive" element={<AgentHive />} />
          <Route path="neural" element={<NeuralLink />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
