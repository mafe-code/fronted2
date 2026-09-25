import { useState, useEffect } from "react";
import { createCourse, updateCourse } from "../../services/courseService";

export default function Courseform({ courseToEdit, onClose, onCourseAdded }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maxCapacity, setMaxCapacity] = useState(30); // Valor por defecto
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (courseToEdit) {
      setCode(courseToEdit.code || "");
      setName(courseToEdit.name || "");
      setDescription(courseToEdit.description || "");
      setMaxCapacity(courseToEdit.maxCapacity || 30);
    } else {
      setCode("");
      setName("");
      setDescription("");
      setMaxCapacity(30);
    }
  }, [courseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!code.trim() || !name.trim()) {
      setError("El código y el nombre del curso son obligatorios.");
      return;
    }

    try {
      setSubmitting(true);

      // El objeto enviado debe coincidir con el DTO de Java
      const coursePayload = {
        code: code.trim(),
        name: name.trim(),
        description: description.trim(),
        maxCapacity: Number(maxCapacity) || 30, // Se envía como Integer
      };

      if (courseToEdit) {
        const id = courseToEdit.id || courseToEdit.course_id;
        await updateCourse(id, coursePayload);
      } else {
        await createCourse(coursePayload);
      }

      onCourseAdded();
      onClose();
    } catch (err) {
      console.error("Error al guardar curso:", err);
      setError("Error al registrar el curso en la base de datos.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        {courseToEdit ? "Editar Curso" : "Registrar Curso"}
      </h2>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Código del Curso
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ej: DS_N2_S2"
          className="w-full px-3 py-2 border rounded-lg bg-blue-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Nombre del Curso
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Bases de Datos"
          className="w-full px-3 py-2 border rounded-lg bg-blue-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Capacidad Máxima
        </label>
        <input
          type="number"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
          placeholder="Ej: 30"
          className="w-full px-3 py-2 border rounded-lg bg-blue-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del curso..."
          className="w-full px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
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
          {submitting ? "Guardando..." : courseToEdit ? "Guardar Cambios" : "Crear Curso"}
        </button>
      </div>
    </form>
  );
}
