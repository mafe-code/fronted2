
import { useState } from 'react';

export function useFormState(initialValues = {}) {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 
  const resetForm = (newValues = initialValues) => {
    setFormData(newValues);
    setError(null);
  };

  
  const handleSubmit = (onSubmitCallback) => async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmitCallback(formData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocurrió un error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    resetForm,
    loading,
    error
  };
}