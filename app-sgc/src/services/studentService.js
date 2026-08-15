
import { supabase } from "../config/supabase";

export const getStudents = async () => {
    const { data, error} = await supabase
    .from('student')
    .select('*')

if (error) {
    throw new Error(error.message)
}
  return data;
};