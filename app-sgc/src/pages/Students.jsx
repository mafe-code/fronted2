import { useState } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import StudentTable from "../components/StudentTable";
import Footer from "../components/Footer";
import { getStudents } from "../services/studentService";

function Students() {
  // Estado para almacenar la lista de estudiantes
  const [students, setStudents] = useState([
    {
      id: 1,
      nombre: "María Fernanda",
      apellido: "Correa",
      correo: "mafe@example.com",
      celular: "3001234567",
    },
  ]);

  // Funciones para manejar las acciones de editar y eliminar
  const handleEdit = (student) => {
    console.log("Editar estudiante:", student);
  };

  const handleDelete = (id) => {
    console.log("Eliminar estudiante con ID:", id);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <header>
          <Nav />
        </header>

        <main className="max-w-7xl mx-auto w-full p-4">
          <Header
            title="Students"
            description="Gestión y lista de estudiantes"
            txtButton="Nuevo Estudiante"
          />

          <section className="mt-4">
            <StudentTable
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Students;