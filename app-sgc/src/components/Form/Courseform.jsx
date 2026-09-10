
import { useState } from 'react';
import { supabase } from '../../config/supabase.js';

function Courseform({ onClose, onCourseAdded }) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

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
      const { error } = await supabase.from('course').insert([
        {
          code: formData.code,
          name: formData.name,
          description: formData.description
        }
      ]);

      if (error) throw error;

      if (onCourseAdded) {
        await onCourseAdded();
      }

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error al registrar el curso en Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Registrar Curso</h2>

      {errorMsg && (
        <div className="mb-4 p-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Código del Curso</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Ej. DS_N1_S1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre del Curso</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej. Lógica de Programación"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ej. Curso de lógica y desarrollo de software"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
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
            {loading ? 'Guardando...' : 'Crear Curso'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Courseform;