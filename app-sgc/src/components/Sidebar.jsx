import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Estudiantes', path: '/students' },
    { name: 'Cursos', path: '/courses' },
    { name: 'Matrículas', path: '/enrollments' },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white min-h-screen p-6 flex flex-col justify-between">
      <div>
        {/* Encabezado con Ícono y Título */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <svg className="w-7 h-7 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4l7 3.82 7-3.82v-4L12 17l-7-3.82z"/>
          </svg>
          <h1 className="text-sm font-bold leading-tight">
            Sistema de Gestión <br /> de Cursos
          </h1>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Pie de página */}
      <div className="text-xs text-slate-400 pt-4 px-2 border-t border-slate-800">
        Derechos reservados Cesde
      </div>
    </aside>
  );
}
