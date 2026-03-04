import { supabase } from "../config/supabase";

export const getCursos =  async (_req: any, _res: any) => {
    try {
        const {data, error} = await supabase.from('cursos').select('*');

        if (error) {
            return _res.status(500).json({ error: 'Error al traer cursos'});
        }

        return _res.status(200).json(data);

    
    }catch (error) {
        console.error('Error al traer los cursos:', error);
        return _res.status(500).json({ error: 'Error al traer los cursos' });
    }
};

export const getCursoById = async (_req: any, _res: any) => {
    try {
        const { id } = _req.params;
        const { data, error } = await supabase.from('cursos').select('*').eq('id', id).single();

        if (error) {
            return _res.status(400).json({ error: 'Curso no encontrado' });
        }
        return _res.status(200).json(data);
    }
    catch (error) {
        console.error('Error al traer el curso:', error);
        return _res.status(500).json({ error: 'Error al traer el curso' });
    }
};
