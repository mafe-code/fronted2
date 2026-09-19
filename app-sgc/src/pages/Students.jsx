import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentTable from "../components/Tablas/StudentTable";
import Studentform from "../components/Form/Studentform";
import { useModal } from "../components/Form/useModal"; 
import { 
  getStudents, 
  deleteStudent 
} from "../services/studentService";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentToEdit, setStudentToEdit] = useState(null);

  // Un solo hook de modal para el formulario (Crear y Editar)
  const studentFormModal = useModal();

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

  // Abrir el modal en modo CREACIÓN
  const handleOpenCreate = () => {
    setStudentToEdit(null);
    studentFormModal.openModal();
  };

  // Abrir el modal en modo EDICIÓN enviando los datos del estudiante
  const handleEdit = (student) => {
    setStudentToEdit(student);
    studentFormModal.openModal();
  };

  // Función de eliminación
  const handleDelete = async (id) => {
    if (!id) {
      alert("No se encontró un ID válido para eliminar.");
      return;
    }

    const confirmacion = window.confirm("¿Estás segura de eliminar este estudiante?");
    if (!confirmacion) return;

    try {
      await deleteStudent(id);
      await fetchStudents(); 
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
      alert("Ocurrió un error al intentar eliminar el estudiante.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const id = String(student.id || student.student_id || student.studentId || "").toLowerCase();
    const firstName = String(student.firstName || student.first_name || "").toLowerCase();
    const lastName = String(student.lastName || student.last_name || "").toLowerCase();
    const fullName = `${firstName} ${lastName}`;
    const email = String(student.email || "").toLowerCase();
    const birthDate = String(student.birthDate || student.birth_date || "").toLowerCase();

    return (
      id.includes(term) ||
      firstName.includes(term) ||
      lastName.includes(term) ||
      fullName.includes(term) ||
      email.includes(term) ||
      birthDate.includes(term)
    );
  });

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
            onButtonClick={handleOpenCreate}
          />

          {/* BUSCADOR */}
          <div className="mt-4 mb-4">
            <input
              type="text"
              placeholder="Buscar por ID, nombre, apellido, correo o fecha de nacimiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* TABLA DE ESTUDIANTES */}
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

      {/* MODAL ÚNICO DE FORMULARIO (Creación y Edición) */}
      {studentFormModal.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <Studentform 
              studentToEdit={studentToEdit}
              onClose={studentFormModal.closeModal} 
              onStudentAdded={fetchStudents} 
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Students;