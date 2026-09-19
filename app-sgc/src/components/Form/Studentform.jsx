import React, { useState, useEffect } from "react";
import { createStudent, updateStudent } from "../../services/studentService";

function Studentform({ studentToEdit, onClose, onStudentAdded }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  });

  // Si nos pasan un estudiante para editar, cargamos sus datos en el formulario
  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        firstName: studentToEdit.firstName || studentToEdit.first_name || "",
        lastName: studentToEdit.lastName || studentToEdit.last_name || "",
        email: studentToEdit.email || "",
        birthDate: studentToEdit.birthDate || studentToEdit.birth_date || "",
      });
    } else {
      setFormData({ firstName: "", lastName: "", email: "", birthDate: "" });
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = studentToEdit?.id || studentToEdit?.student_id || studentToEdit?.studentId;

    try {
      const payload = {
        ...formData,
        first_name: formData.firstName,
        last_name: formData.lastName,
        birth_date: formData.birthDate || null,
        birthDate: formData.birthDate || null,
      };

      if (id) {
        // Modo Edición
        await updateStudent(id, payload);
      } else {
        // Modo Creación
        await createStudent(payload);
      }

      if (onStudentAdded) await onStudentAdded();
      onClose();
    } catch (error) {
      console.error("Error al guardar estudiante:", error);
      alert("Ocurrió un error al guardar los datos.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">
        {studentToEdit ? "Editar Estudiante" : "Nuevo Estudiante"}
      </h3>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Nombre</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Apellido</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Correo</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Fecha de Nacimiento</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
        >
          {studentToEdit ? "Guardar Cambios" : "Crear Estudiante"}
        </button>
      </div>
    </form>
  );
}

export default Studentform;