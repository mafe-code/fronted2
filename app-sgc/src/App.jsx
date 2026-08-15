import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal de las páginas */}
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/enrollments" element={<Enrollments />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}