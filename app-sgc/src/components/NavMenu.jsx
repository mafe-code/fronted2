import { Link } from "react-router-dom";

function NavMenu() {
  return (
    <nav>
      <ul className="flex flex-col space-y-2">
        <li>
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/courses" className="text-gray-700 hover:text-blue-500">
            Cursos
          </Link>
        </li>
        <li>
          <Link to="/students" className="text-gray-700 hover:text-blue-500">
            Estudiantes
          </Link>
        </li>
        <li>
          <Link to="/enrollments" className="text-gray-700 hover:text-blue-500">
            Matriculas
          </Link>
        </li>
        <li>
          <Link to="/prueba" className="text-gray-700 hover:text-blue-500">
            Layout Prueba
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;