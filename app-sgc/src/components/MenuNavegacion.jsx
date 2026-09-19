
function MenuNavegacion() {
  return (
    <nav>
      <ul>
        <li><a className="text-gray-700 hover:text-blue-500" href="/">Dashboard</a></li>
        <li><a href="/courses">Cursos</a></li>
        <li><a href="/students">Estudiantes</a></li>
        <li><a href="/enrollments">Matriculas</a></li>
        <li><a href="/prueba">Layout Prueba</a></li>
      </ul>
    </nav>
  );
}

export default MenuNavegacion;