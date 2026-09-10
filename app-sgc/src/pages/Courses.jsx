import { useState, useEffect } from "react";
import Nav from "../components/Nav.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CourseTable from "../components/Tablas/CourseTable.jsx";
import CourseForm from "../components/Form/Courseform.jsx";
import { useModal } from "../components/Form/useModal.jsx";
import { supabase } from "../config/supabase.js";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const createModal = useModal();
  const editModal = useModal();

  const [editFormData, setEditFormData] = useState({
    course_id: "",
    code: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("course").select("*");
      if (error) {
        console.error("Error al obtener cursos:", error.message);
      } else {
        setCourses(data || []);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // EDITAR CURSO
  const handleEdit = (course) => {
    const courseData = {
      course_id: course.course_id || course.id,
      code: course.code || course["código"] || "",
      name: course.name || course.nombre || "",
      description: course.description || course["descripción"] || "",
    };
    setEditFormData(courseData);
    editModal.openModal(courseData);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const courseId = editModal.modalData.course_id;
      const { error } = await supabase
        .from("course")
        .update({
          code: editFormData.code,
          name: editFormData.name,
          description: editFormData.description,
        })
        .eq("course_id", courseId);

      if (error) throw error;

      editModal.closeModal();
      await fetchCourses();
    } catch (error) {
      console.error("Error al actualizar curso:", error);
      alert("No se pudieron guardar los cambios en Supabase.");
    }
  };

  // ELIMINAR CURSO
  const handleDelete = async (id) => {
    const confirmacion = window.confirm("¿Estás segura de eliminar este curso?");
    if (!confirmacion) return;

    try {
      const { error } = await supabase
        .from("course")
        .delete()
        .eq("course_id", id);

      if (error) throw error;

      await fetchCourses();
    } catch (error) {
      console.error("Error al eliminar curso:", error);
      alert("Ocurrió un error al intentar eliminar el curso.");
    }
  };

  // FILTRADO
  const filteredCourses = courses.filter((course) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const code = String(course.code || course["código"] || "").toLowerCase();
    const name = String(course.name || course.nombre || "").toLowerCase();
    const description = String(course.description || course["descripción"] || "").toLowerCase();

    return code.includes(term) || name.includes(term) || description.includes(term);
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <header>
          <Nav />
        </header>

        <main className="max-w-7xl mx-auto w-full p-4">
          <Header
            title="Cursos"
            description="Gestión de cursos del sistema"
            txtButton="Nuevo Curso"
            onButtonClick={() => createModal.openModal()}
          />

          {/* BUSCADOR */}
          <div className="mt-4 mb-4">
            <input
              type="text"
              placeholder="Buscar por código, nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* TABLA DE CURSOS */}
          <section>
            {loading ? (
              <p className="text-gray-500 text-center py-4">Cargando cursos...</p>
            ) : (
              <CourseTable
                courses={filteredCourses}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </section>
        </main>
      </div>

      {/* MODAL CREAR NUEVO CURSO */}
      {createModal.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <CourseForm
              onClose={createModal.closeModal}
              onCourseAdded={fetchCourses}
            />
          </div>
        </div>
      )}

      {/* MODAL EDITAR CURSO */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Editar Curso</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Código</label>
                <input
                  type="text"
                  name="code"
                  value={editFormData.code}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Descripción</label>
                <input
                  type="text"
                  name="description"
                  value={editFormData.description}
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

export default Courses;