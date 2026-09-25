import React from "react";

function EnrollmentTable({ enrollments, students = [], courses = [], searchTerm = "", onDelete }) {
  // Busca el nombre completo del estudiante usando su ID
  const getStudentName = (id) => {
    const found = students.find((s) => String(s.id) === String(id));
    if (!found) return `Estudiante #${id}`;
    const firstName = found.firstName || found.first_name || "";
    const lastName = found.lastName || found.last_name || "";
    return `${firstName} ${lastName}`.trim() || `Estudiante #${id}`;
  };

  // Busca el código y nombre del curso usando su ID
  const getCourseName = (id) => {
    const found = courses.find((c) => String(c.id) === String(id));
    if (!found) return `Curso #${id}`;
    const code = found.code || found.codigo || "";
    const name = found.name || found.nombre || "";
    return code ? `${code} - ${name}` : name || `Curso #${id}`;
  };

  // Filtra por texto en nombre de estudiante o de curso
  const filtered = (enrollments || []).filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const studentName = getStudentName(item.studentId || item.student_id).toLowerCase();
    const courseName = getCourseName(item.courseId || item.course_id).toLowerCase();

    return studentName.includes(term) || courseName.includes(term);
  });

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-700 font-semibold">
            <th className="p-4">Estudiante</th>
            <th className="p-4">Curso</th>
            <th className="p-4">Fecha de Matrícula</th>
            <th className="p-4">Estado</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const studentId = item.studentId ?? item.student_id;
              const courseId = item.courseId ?? item.course_id;
              const date = item.enrollmentDate || item.enrollment_date || "-";

              return (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-medium text-gray-800">
                    {getStudentName(studentId)}
                  </td>
                  <td className="p-4 text-gray-600">
                    {getCourseName(courseId)}
                  </td>
                  <td className="p-4 text-gray-600">{date}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {item.status || "ACTIVE"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No se encontraron matrículas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EnrollmentTable;