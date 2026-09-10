import { useState, useEffect } from "react";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import EnrollmentTable from "../components/Tablas/EnrollmentTable.jsx";
import EnrollmentForm from "../components/Form/Enrollmentform.jsx";
import { useModal } from "../components/Form/useModal.jsx";
import { supabase } from "../config/supabase.js";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const createModal = useModal();
  const editModal = useModal();

  const [editFormData, setEditFormData] = useState({
    id: "",
    student_id: "",
    course_id: "",
    enrollment_date: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("enrollment").select("*");
      if (error) {
        console.error("Error al obtener matrículas:", error.message);
      } else {
        setEnrollments(data || []);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // EDITAR MATRÍCULA
  const handleEdit = (item) => {
    setEditFormData({
      id: item.id,
      student_id: item.student_id || "",
      course_id: item.course_id || "",
      enrollment_date: item.enrollment_date || "",
      status: item.status || "ACTIVE",
    });
    editModal.openModal(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("enrollment")
        .update({
          student_id: editFormData.student_id,
          course_id: editFormData.course_id,
          enrollment_date: editFormData.enrollment_date,
          status: editFormData.status,
        })
        .eq("id", editFormData.id);

      if (error) throw error;

      editModal.closeModal();
      await fetchEnrollments();
    } catch (error) {
      console.error("Error al actualizar matrícula:", error);
      alert("No se pudieron guardar los cambios.");
    }
  };

  // ELIMINAR MATRÍCULA
  const handleDelete = async (id) => {
    const confirmacion = window.confirm("¿Estás segura de eliminar esta matrícula?");
    if (!confirmacion) return;

    try {
      const { error } = await supabase
        .from("enrollment")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await fetchEnrollments();
    } catch (error) {
      console.error("Error al eliminar matrícula:", error);
      alert("Ocurrió un error al intentar eliminar.");
    }
  };

  // FILTRADO
  const filteredEnrollments = enrollments.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const studentId = String(item.student_id || "").toLowerCase();
    const courseId = String(item.course_id || "").toLowerCase();
    const status = String(item.status || "").toLowerCase();

    return studentId.includes(term) || courseId.includes(term) || status.includes(term);
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <header>
          <Nav />
        </header>

        <main className="max-w-7xl mx-auto w-full p-4">
          <Header
            title="Matrículas"
            description="Gestión de inscripciones de estudiantes a cursos"
            txtButton="Nueva Matrícula"
            onButtonClick={() => createModal.openModal()}
          />

          {/* BUSCADOR */}
          <div className="mt-4 mb-4">
            <input
              type="text"
              placeholder="Buscar por ID de estudiante, curso o estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* TABLA DE MATRÍCULAS */}
          <section>
            {loading ? (
              <p className="text-gray-500 text-center py-4">Cargando matrículas...</p>
            ) : (
              <EnrollmentTable
                enrollments={filteredEnrollments}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </section>
        </main>
      </div>

      {/* MODAL CREAR NUEVA MATRÍCULA */}
      {createModal.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <EnrollmentForm
              onClose={createModal.closeModal}
              onEnrollmentAdded={fetchEnrollments}
            />
          </div>
        </div>
      )}

      {/* MODAL EDITAR MATRÍCULA */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Editar Matrícula</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">ID Estudiante</label>
                <input
                  type="text"
                  name="student_id"
                  value={editFormData.student_id}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">ID Curso</label>
                <input
                  type="text"
                  name="course_id"
                  value={editFormData.course_id}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Fecha de Matrícula</label>
                <input
                  type="date"
                  name="enrollment_date"
                  value={editFormData.enrollment_date}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Estado</label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
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

export default Enrollments;