import React from "react";

function CourseTable({ courses, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-700 font-semibold">
            <th className="p-4">Código</th>
            <th className="p-4">Nombre del Curso</th>
            <th className="p-4">Descripción</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {courses && courses.length > 0 ? (
            courses.map((course) => {
              const id = course.course_id || course.id;
              const code = course.code || course.código || course.codigo || "N/A";
              const name = course.name || course.nombre || "Sin nombre";
              const description =
                course.description || course.descripción || course.descripcion || "-";

              return (
                <tr key={id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-medium text-blue-600">{code}</td>
                  <td className="p-4 font-semibold text-gray-800">{name}</td>
                  <td className="p-4 text-gray-600 max-w-md truncate">{description}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => onEdit(course)}
                      className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(id)}
                      className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-500">
                No se encontraron cursos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;