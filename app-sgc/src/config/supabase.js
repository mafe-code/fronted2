import { createClient as createSupabaseClient } from '@supabase/supabase-js';


const supabaseUrl = 
  import.meta.env?.VITE_SUPABASE_URL || 
  'https://vnqtrwnwlyiyblrgxkrf.supabase.co';

const supabaseKey = 
  import.meta.env?.VITE_SUPABASE_ANON_KEY || 
  'sb_publishable_SedFNUOaqkQ5qKG2Zm15gQ_UX03Nqse'; 


export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);


export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseKey);
};