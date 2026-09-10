import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentTable from "../components/Tablas/StudentTable";
import Studentform from "../components/Form/Studentform";
import { useModal } from "../components/Form/useModal"; 
import { 
  getStudents, 
  updateStudent, 
  deleteStudent 
} from "../services/studentService";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  
  const createModal = useModal();
  const editModal = useModal();

  
  const [editFormData, setEditFormData] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

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

  
  const handleEdit = (student) => {
    const studentData = {
      student_id: student.student_id || student.studentId || "",
      first_name: student.first_name || student.firstName || "",
      last_name: student.last_name || student.lastName || "",
      email: student.email || "",
      phone_number: student.phone_number || student.phoneNumber || "",
    };
    setEditFormData(studentData);
    editModal.openModal(studentData);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const studentId = editModal.modalData.student_id;
      await updateStudent(studentId, {
        first_name: editFormData.first_name,
        last_name: editFormData.last_name,
        email: editFormData.email,
        phone_number: editFormData.phone_number,
      });

      editModal.closeModal();
      await fetchStudents(); 
    } catch (error) {
      console.error("Error al actualizar estudiante:", error);
      alert("No se pudieron guardar los cambios en Supabase.");
    }
  };

 
  const handleDelete = async (id) => {
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

    const id = String(student.student_id || student.studentId || "").toLowerCase();
    const firstName = String(student.first_name || student.firstName || "").toLowerCase();
    const lastName = String(student.last_name || student.lastName || "").toLowerCase();
    const fullName = `${firstName} ${lastName}`;
    const email = String(student.email || "").toLowerCase();
    const phone = String(student.phone_number || student.phoneNumber || "").toLowerCase();

    return (
      id.includes(term) ||
      firstName.includes(term) ||
      lastName.includes(term) ||
      fullName.includes(term) ||
      email.includes(term) ||
      phone.includes(term)
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
            onButtonClick={() => createModal.openModal()}
          />

          {/* BUSCADOR */}
          <div className="mt-4 mb-4">
            <input
              type="text"
              placeholder="Buscar por ID, nombre, apellido, correo o celular..."
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

      {/* MODAL CREAR NUEVO ESTUDIANTE */}
      {createModal.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <Studentform 
              onClose={createModal.closeModal} 
              onStudentAdded={fetchStudents} 
            />
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Editar Estudiante</h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre</label>
                <input
                  type="text"
                  name="first_name"
                  value={editFormData.first_name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Apellido</label>
                <input
                  type="text"
                  name="last_name"
                  value={editFormData.last_name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Correo</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Celular</label>
                <input
                  type="text"
                  name="phone_number"
                  value={editFormData.phone_number}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={editModal.closeModal}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Students; 