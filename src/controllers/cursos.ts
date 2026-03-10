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
        const { data, error } = await supabase.from('cursos').select('*').eq('id_curso', id).single();

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

export const getCursoByCategoria = async (_req: any, _res: any) => {
    try {
        const { categoria } = _req.params;
        const { data, error } = await supabase.from('cursos').select('*').eq('categoria', categoria);

        if (error) {
            return _res.status(400).json({ error: 'Cursos no encontrados para esta categoría' });
        }
        return _res.status(200).json(data);
    }
    catch (error) {
        console.error('Error al traer los cursos por categoría:', error);
        return _res.status(500).json({ error: 'Error al traer los cursos por categoría' });
    }
};


/* CRUD - Admin */
export const createCurso = async (_req: any, _res: any) => {
    try {
        const {titulo, descripcion, categoria, estado, duracion} = _req.body;

        const {data,error} = await supabase.from('cursos')
            .insert({titulo, descripcion, categoria, estado, duracion}).select().single();

        if (error) {
            return _res.status(400).json({error: 'Error al crear el curso'});
        };
        return _res.status(200).json(data);
    } catch (error) {
        console.error('Error al crear el curso:', error);
        return _res.status(500).json({error: 'Error al crear el curso'});
    }
};

export const updateCurso = async (_req: any, _res: any) => {
    const { id_curso } = _req.params;
    const updates = _req.body;

    const {data, error} = await supabase.from('cursos').update(updates)
        .eq('id_curso', id_curso).select().single();

    if (error) {
        return _res.status(400).json({ error: 'Error al actualizar el curso' });
    };
    return _res.status(200).json(data);
};

export const deleteCurso = async (_req: any, _res: any) => {
    const { id_curso } = _req.params;

    const {error} = await supabase.from('cursos').delete().eq('id_curso', id_curso)

    if (error) {
        return _res.status(400).json({ error: 'Error realizar esta acción' });
    };
    return _res.status(200).send();
};

/* Modulos en cursos */
export const getModulos = async (_req: any, _res: any) => {
   try {
        const {id_curso} = _req.params;
        const {data, error} = await supabase.from('cursos').select('*, modulos_cursos(*)')
            .eq('id_curso', id_curso).single()

        if (error) {
            return _res.status(500).json({ error: 'Error al traer cursos'});
        }

        return _res.status(200).json(data);
    
    }catch (error) {
        console.error('Error al traer los cursos:', error);
        return _res.status(500).json({ error: 'Error al traer los cursos' });
    }
};

export const addModuloToCurso = async (_req: any, _res: any) => {
    try {
        const {id_curso} = _req.params;
        const {titulo, url_contenido, tipo, duracion, transcripcion} = _req.body;

        const {data, error} = await supabase.from('modulos_cursos')
            .insert({id_curso, titulo, url_contenido, tipo, duracion, transcripcion}).select().single();

        if (error) {
            return _res.status(400).json({error: 'Error al agregar el módulo al curso'});
        }
        return _res.status(200).json(data);
    } catch (error) {
        console.error('Error al agregar el módulo al curso:', error);
        return _res.status(500).json({error: 'Error al agregar el módulo al curso'});
    }
};

export const updateModulo = async (_req: any, _res: any) => {
    const { id_modulo } = _req.params;
    const updates = _req.body;

    const {data, error} = await supabase.from('modulos_cursos').update(updates)
        .eq('id_modulo', id_modulo).select().single();

    if (error) {
        return _res.status(400).json({ error: 'Error al actualizar el módulo del curso' });
    };
    return _res.status(200).json(data);
};

export const deleteModuloFromCurso = async (_req: any, _res: any) => {
    const { id_modulo } = _req.params;

    const {error} = await supabase.from('modulos_cursos').delete().eq('id_modulo', id_modulo).single()

    if (error) {
        return _res.status(400).json({error: 'Error realizar esta acción'});
    };
    return _res.status(200).send();
};