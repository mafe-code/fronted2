import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import StudentTable from "../components/StudentTable";
import Footer from "../components/Footer";
import { getStudents } from "../services/studentService";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data || []);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar la lista de estudiantes según lo que se escriba en el buscador
  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    const firstName = (student.first_name || "").toLowerCase();
    const lastName = (student.last_name || "").toLowerCase();
    const email = (student.email || "").toLowerCase();

    return (
      firstName.includes(term) ||
      lastName.includes(term) ||
      email.includes(term)
    );
  });

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
            title="Estudiantes"
            description="Gestión de estudiantes registrados"
            txtButton="Nuevo Estudiante"
          />

          {/* BARRA DE BÚSQUEDA IGUAL A LA DEL PROFESOR */}
          <div className="mt-4 mb-4">
            <input
              type="text"
              placeholder="Buscar estudiante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <section>
            {loading ? (
              <p className="text-gray-500 text-center py-4">Cargando estudiantes...</p>
            ) : (
              <StudentTable
                students={filteredStudents}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Students;