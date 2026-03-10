import { supabase } from "../config/supabase";


/* Conectar con usuarios y admin */
export const createCoaching = async (_req: any, _res: any) => {
    try {
        const {fecha_hora, estado} = _req.body;

        const {data, error} = await supabase.from('coaching')
            .insert({fecha_hora, estado}).select().single();

        if (error) {
            return _res.status(400).json({error: 'Error al crear la sesión'});
        };
        return _res.status(200).json(data);
    } catch (error) {
        console.error('Error al crear el coaching:', error);
        return _res.status(500).json({error: 'Error al crear el coaching'});
    }
};
