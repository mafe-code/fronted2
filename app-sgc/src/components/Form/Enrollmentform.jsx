import { useState, useEffect } from "react";
import { getStudents } from "../../services/studentService";
import { getCourses } from "../../services/courseService";
import { createEnrollment } from "../../services/enrollmentService";

export default function Enrollmentform({ onClose, onEnrollmentAdded }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadSelectOptions();
  }, []);

  const loadSelectOptions = async () => {
    try {
      const studentsData = await getStudents();
      const coursesData = await getCourses();

      setStudents(Array.isArray(studentsData) ? studentsData : studentsData?.content || []);
      setCourses(Array.isArray(coursesData) ? coursesData : coursesData?.content || []);
    } catch (err) {
      console.error("Error al cargar opciones:", err);
      setError("No se pudieron cargar los estudiantes o cursos.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!studentId || !courseId) {
      setError("Debes seleccionar un estudiante y un curso.");
      return;
    }

    try {
      setSubmitting(true);

      // Enviamos las llaves según como las espere tu DTO de Java
      const payload = {
        studentId: Number(studentId),
        courseId: Number(courseId),
      };

      await createEnrollment(payload);
      onEnrollmentAdded();
      onClose();
    } catch (err) {
      console.error("Error al matricular:", err);
      setError("Ocurrió un error al realizar la matrícula.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Nueva Matrícula</h2>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Estudiante
        </label>
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Selecciona un estudiante...</option>
          {students.map((std) => (
            <option key={std.id} value={std.id}>
              {std.firstName || std.first_name} {std.lastName || std.last_name} ({std.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Curso
        </label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Selecciona un curso...</option>
          {courses.map((crs) => (
            <option key={crs.id} value={crs.id}>
              {crs.code || crs.codigo} - {crs.name || crs.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
        >
          {submitting ? "Matriculando..." : "Matricular"}
        </button>
      </div>
    </form>
  );
}