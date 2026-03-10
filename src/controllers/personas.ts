import { supabase } from "../config/supabase";


export const getPersonas = async (_req: any, _res: any) =>  {
    try{
        const {data, error} = await supabase.from('personas').select('*');

        if(error) {
            return _res.status(500).json({ error: 'Error al traer personas'});
        }

        return _res.status(200).json(data);
    }catch (error) {
        console.error('Error al traer las personas:', error);
        return _res.status(500).json({ error: 'Error al traer las personas' });

}}



export const getPersonasByRol = async (_req: any, _res: any) => {
    try{
        //const {rol} = _req.params;
        const {data, error} = await supabase.from('rol_personas').select('*');

        if(error){
            return _res.status(500).json({ error: 'Error al traer personas por rol'});
        }

        return _res.status(200).json(data);

    }catch (error) {
        console.error('Error al traer las personas con rol:', error);
        return _res.status(500).json({ error: 'Error al traer las personas con rol' });

    }

}