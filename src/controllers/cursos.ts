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


3