import Students from "../pages/Students";

function StudentTable(
    { students, 
     onEdit, 
     onDelete
     }
    ) {
  return (
    <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
      <thead className="bg-slate-100">
        <tr>
    <th className="text-left p-4">Nombre</th>
    <th className="text-left p-4">Apellido</th>
    <th className="text-left p-4">Correo</th>
    <th className="text-left p-4">Celular</th>
    <th className="text-center p-4">Acciones</th>
  </tr>
      </thead>

      <tbody>
        {students.map((student) =>(
            <tr
            key={student.student_id}
            className="border-t"
            >
            </tr>
        )
        )}

      </tbody>
    </table>
  );
}

export default StudentTable;