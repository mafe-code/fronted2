import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// 1. Lectura segura de variables con valor por defecto
const supabaseUrl = 
  import.meta.env?.VITE_SUPABASE_URL || 
  'https://vnqtrwnwlyiyblrgxkrf.supabase.co';

const supabaseKey = 
  import.meta.env?.VITE_SUPABASE_ANON_KEY || 
  'sb_publishable_SedFNUOaqkQ5qKG2Zm15gQ_UX03Nqse'; // 👈 Reemplaza por tu clave anon de Supabase

// 2. Cliente exportado para tus componentes de React
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// 3. Estructura conservada para la exigencia del profesor
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseKey);
};