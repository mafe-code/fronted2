import { supabase } from "../config/supabase";

export const getStudents = async () => {
  const { data, error } = await supabase
    .from('Student')
    .select('*');

  if (error) throw new Error(error.message);
  return data;
};


export const createStudent = async (studentData) => {
  const { data, error } = await supabase
    .from('Student')
    .insert([studentData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

// 3. Actualizar un estudiante existente
export const updateStudent = async (studentId, updatedData) => {
  const { data, error } = await supabase
    .from('Student')
    .update(updatedData)
    .eq('student_id', studentId)
    .select();

  if (error) throw new Error(error.message);
  return data;
};


export const deleteStudent = async (studentId) => {
  const { error } = await supabase
    .from('Student')
    .delete()
    .eq('student_id', studentId);

  if (error) throw new Error(error.message);
  return true;
};