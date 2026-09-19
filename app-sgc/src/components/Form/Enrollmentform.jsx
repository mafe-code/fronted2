
import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase.js';

function Enrollmentform({ onClose, onEnrollmentAdded }) {
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: '',
    enrollment_date: new Date().toISOString().split('T')[0],
    status: 'ACTIVE'
  });

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchSelectOptions();
  }, []);

  const fetchSelectOptions = async () => {
    try {
      const { data: studentsData } = await supabase.from('Student').select('student_id, first_name, last_name');
      const { data: coursesData } = await supabase.from('course').select('course_id, name, code');

      if (studentsData) setStudents(studentsData);
      if (coursesData) setCourses(coursesData);
    } catch (err) {
      console.error('Error cargando listas:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.from('enrollment').insert([
        {
          student_id: formData.student_id,
          course_id: formData.course_id,
          enrollment_date: formData.enrollment_date,
          status: formData.status
        }
      ]);

      if (error) throw error;

      if (onEnrollmentAdded) {
        await onEnrollmentAdded();
      }

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error al registrar la matrícula en Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Nueva Matrícula</h2>

      {errorMsg && (
        <div className="mb-4 p-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Estudiante</label>
          <select
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona un estudiante</option>
            {students.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.student_id} - {student.first_name} {student.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Curso</label>
          <select
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona un curso</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.code || course.course_id} - {course.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Fecha de Matrícula</label>
          <input
            type="date"
            name="enrollment_date"
            value={formData.enrollment_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
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
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Crear Matrícula'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Enrollmentform;