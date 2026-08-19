function StudentTable({ students = [], onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100/70 border-b border-gray-300 text-gray-700 text-sm font-semibold">
            <th className="py-3 px-6">Nombre</th>
            <th className="py-3 px-6">Apellido</th>
            <th className="py-3 px-6">Correo</th>
            <th className="py-3 px-6">Celular</th>
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
            students.map((student) => (
              <tr key={student.student_id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-6 font-medium text-gray-800">
                  {student.first_name}
                </td>
                <td className="py-3.5 px-6">
                  {student.last_name}
                </td>
                <td className="py-3.5 px-6 text-gray-600">
                  {student.email}
                </td>
                <td className="py-3.5 px-6">
                  {student.phone_number}
                </td>
                <td className="py-3.5 px-6 text-right space-x-3 font-medium text-xs">
                  <button 
                    onClick={() => onEdit && onEdit(student)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onDelete && onDelete(student.student_id)}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;