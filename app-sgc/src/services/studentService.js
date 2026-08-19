
import { supabase } from "../config/supabase";

export const getStudents = async () => {
    const { data, error} = await supabase
    .from('Student')
    .select('*');

if (error) {
    throw new Error(error.message);
}
  return data;
};
