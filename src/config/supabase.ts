import { createClient } from "@supabase/supabase-js"; // se importa la función createClient de la biblioteca supabase-js para crear una instancia del cliente de Supabase
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL || ''; // se ocupan variables del .env
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';// se ocupan variables del .env


// Ahora se tiene que validar si se encuentran las variables de entorno, si no se encuentran se lanza un error
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY son necesarias');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

