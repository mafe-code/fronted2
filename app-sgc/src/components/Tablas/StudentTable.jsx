import React from 'react';

function StudentTable({ students = [], onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100/70 border-b border-gray-300 text-gray-700 text-sm font-semibold">
            <th className="py-3 px-6">Nombre</th>
            <th className="py-3 px-6">Apellido</th>
            <th className="py-3 px-6">Correo</th>
            <th className="py-3 px-6">Fecha Nacimiento</th>
            <th className="py-3 px-6 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 text-center text-gray-500">
                No hay estudiantes registrados.
              </td>
            </tr>
          ) : (
            students.map((student, index) => {
              // Priorizar 'id' de Spring Boot/MySQL
              const studentId = student.id || student.student_id || student.studentId;

              return (
                <tr key={studentId || index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-6 font-medium text-gray-800">
                    {student.firstName || student.first_name}
                  </td>
                  <td className="py-3.5 px-6">
                    {student.lastName || student.last_name}
                  </td>
                  <td className="py-3.5 px-6 text-gray-600">
                    {student.email}
                  </td>
                  <td className="py-3.5 px-6">
                    {student.birthDate || student.birth_date || student.phone_number || '-'}
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-3 font-medium text-xs">
                    <button 
                      type="button"
                      onClick={() => onEdit && onEdit(student)}
                      className="text-blue-600 hover:text-blue-800 transition-colors font-semibold cursor-pointer"
                    >
                      Editar
                    </button>
                    <button 
                      type="button"
                      onClick={() => onDelete && onDelete(studentId)}
                      className="text-red-600 hover:text-red-800 transition-colors font-semibold cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;