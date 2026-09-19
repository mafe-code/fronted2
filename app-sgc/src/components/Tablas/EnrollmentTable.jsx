
import React from "react";

function EnrollmentTable({ enrollments, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-700 font-semibold">
            <th className="p-4">Estudiante (ID)</th>
            <th className="p-4">Curso (ID)</th>
            <th className="p-4">Fecha de Matrícula</th>
            <th className="p-4">Estado</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {enrollments && enrollments.length > 0 ? (
            enrollments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="p-4 font-medium text-gray-800">{item.student_id}</td>
                <td className="p-4 font-medium text-gray-800">{item.course_id}</td>
                <td className="p-4 text-gray-600">{item.enrollment_date || "-"}</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status || "ACTIVE"}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
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