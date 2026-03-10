import { supabase } from "../config/supabase";


// TODO LO RELACIONADO CON LAS PERSONAS, YA SEA SUS CURSOS, SU ROL, ETC. VA A IR EN ESTE CONTROLADOR

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

export const getCursosByPersona = async (_req: any, _res: any) => {
    try{
        const {id} = _req.params;
        const {data, error} = await supabase.from('cursos_personas').select('*').eq('id_persona', id);

        if(error){
            return _res.status(500).json({ error: 'Error al traer cursos de la persona'});
        }

       return _res.status(200).json(data);

    }catch (error) {
        console.error('Error al traer los cursos de la persona:', error);
        return _res.status(500).json({ error: 'Error al traer los cursos de la persona' }); 
}}

