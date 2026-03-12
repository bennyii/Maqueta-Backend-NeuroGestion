import { supabase } from "../config/supabase";



export const getProgresoByPersona = async (_req: any, _res: any) => { // se trae el progreso de una persona por su id
    try {
        const {id} = _req.params;
        const {data, error} = await supabase.from('progreso_persona').select('*,personas(nombre_completo), modulos_cursos(titulo)').eq('auth_user_id', id);

        if(error){
            return _res.status(500).json({ error: 'Error al traer el progreso de la persona'});
        }

        return _res.status(200).json(data);
    }catch (error) {
        console.error('Error al traer el progreso de la persona:', error);
        return _res.status(500).json({ error: 'Error al traer el progreso de la persona' });
    }}


