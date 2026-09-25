import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EnrollmentTable from "../components/Tablas/EnrollmentTable";
import Enrollmentform from "../components/Form/Enrollmentform";
import { useModal } from "../components/Form/useModal";
import { getEnrollments, deleteEnrollment } from "../services/enrollmentService";
import { getStudents } from "../services/studentService";
import { getCourses } from "../services/courseService";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const enrollmentFormModal = useModal();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [eRes, sRes, cRes] = await Promise.all([
        getEnrollments(),
        getStudents(),
        getCourses(),
      ]);

      setEnrollments(Array.isArray(eRes) ? eRes : eRes?.content || []);
      setStudents(Array.isArray(sRes) ? sRes : sRes?.content || []);
      setCourses(Array.isArray(cRes) ? cRes : cRes?.content || []);
    } catch (err) {
      console.error("Error al cargar información:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás segura de eliminar esta matrícula?")) return;
    try {
      await deleteEnrollment(id);
      await loadData();
    } catch (err) {
      console.error("Error al eliminar matrícula:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <header>
          <Nav />
        </header>

        <main className="max-w-7xl mx-auto w-full p-4">
          <Header
            title="Matrículas"
            description="Gestión de estudiantes matriculados"
            txtButton="Nueva Matrícula"
            onButtonClick={enrollmentFormModal.openModal}
          />

          <div className="mt-4 mb-4">
            <input
              type="text"
              placeholder="Buscar por estudiante o curso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <section>
            {loading ? (
              <p className="text-gray-500 text-center py-4">Cargando matrículas...</p>
            ) : (
              <EnrollmentTable
                enrollments={enrollments}
                students={students}
                courses={courses}
                searchTerm={searchTerm}
                onDelete={handleDelete}
              />
            )}
          </section>
        </main>
      </div>

      {enrollmentFormModal.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <Enrollmentform
              onClose={enrollmentFormModal.closeModal}
              onEnrollmentAdded={loadData}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Enrollments;