import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CourseTable from "../components/Tablas/CourseTable";
import Courseform from "../components/Form/Courseform";
import { useModal } from "../components/Form/useModal"; 
import { 
  getCourses, 
  deleteCourse 
} from "../services/courseService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseToEdit, setCourseToEdit] = useState(null);

  // Modal para el formulario (Crear y Editar)
  const courseFormModal = useModal();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();

      // Validamos si la respuesta es una lista directa o viene paginada desde Java
      if (Array.isArray(data)) {
        setCourses(data);
      } else if (data && Array.isArray(data.content)) {
        setCourses(data.content);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error al obtener cursos:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal en modo CREACIÓN
  const handleOpenCreate = () => {
    setCourseToEdit(null);
    courseFormModal.openModal();
  };

  // Abrir modal en modo EDICIÓN
  const handleEdit = (course) => {
    setCourseToEdit(course);
    courseFormModal.openModal();
  };

  // Función para eliminar curso
  const handleDelete = async (courseParam) => {
    const id = typeof courseParam === "object" 
      ? (courseParam?.id || courseParam?.course_id || courseParam?.courseId) 
      : courseParam;

    if (!id) {
      alert("No se encontró un ID válido para eliminar.");
      return;
    }

    const confirmacion = window.confirm("¿Estás segura de eliminar este curso?");
    if (!confirmacion) return;

    try {
      await deleteCourse(id);
      await fetchCourses(); 
    } catch (error) {
      console.error("Error al eliminar curso:", error);
      alert("Ocurrió un error al intentar eliminar el curso.");
    }
  };

  // Filtro de búsqueda por código, nombre o descripción
  const filteredCourses = (Array.isArray(courses) ? courses : []).filter((course) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const id = String(course.id || course.course_id || course.courseId || "").toLowerCase();
    const code = String(course.code || course.codigo || "").toLowerCase();
    const name = String(course.name || course.nombre || "").toLowerCase();
    const description = String(course.description || course.descripcion || "").toLowerCase();

    return (
      id.includes(term) ||
      code.includes(term) ||
      name.includes(term) ||
      description.includes(term)
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
            title="Cursos"
            description="Gestión de cursos registrados"
            txtButton="Nuevo Curso"
            onButtonClick={handleOpenCreate}
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

      {/* MODAL ÚNICO DE FORMULARIO (Creación y Edición) */}
      {courseFormModal.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <Courseform 
              courseToEdit={courseToEdit}
              onClose={courseFormModal.closeModal} 
              onCourseAdded={fetchCourses} 
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Courses;