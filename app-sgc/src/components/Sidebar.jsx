import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Students', path: '/students' },
    { name: 'Courses', path: '/courses' },
    { name: 'Enrollments', path: '/enrollments' },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white min-h-screen p-6 flex flex-col gap-6">
      <h1 className="text-xl font-bold px-2">Gestión de Cursos</h1>
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
    </aside>
  );
}
