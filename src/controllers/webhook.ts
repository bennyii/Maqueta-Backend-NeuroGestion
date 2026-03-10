import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

// Configuración del cliente Admin 
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const Erp = async (req: Request, res: Response) => {
  const { nombre, email, rut, password, rol, fono } = req.body;

  try {
    // 1. CREACIÓN EN AUTH (Identidad única)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
     
    });

    if (authError) throw new Error(`Error en Auth: ${authError.message}`);
    const userId = authData.user.id;

    // 2. CREACIÓN EN PUBLIC.PERSONAS (Tu tabla de perfil)
    const { error: personaError } = await supabaseAdmin
      .from('personas')
      .insert({
        auth_user_id: userId, // La FK que apunta a auth.users
        rut_persona: rut,
        nombre_completo: nombre,
        fono: fono,
        estado: 'activo'
      });

    if (personaError) {
      // Si falla aquí, deberíamos borrar el usuario de Auth para no dejar basura
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(`Error en Tabla Personas: ${personaError.message}`);
    }

    // 3. ASIGNACIÓN DEL ROL (Tu tabla de relación)
    // Buscamos el ID del rol basado en el string que mandó el ERP ('coach', 'admin', etc)
    const { data: rolData, error: rolSearchError } = await supabaseAdmin
      .from('rol')
      .select('id_rol')
      .eq('nombre_rol', rol.toLowerCase())
      .single();

    if (rolSearchError || !rolData) {
      throw new Error(`El rol '${rol}' no existe en la base de datos.`);
    }

    const { error: rolPersonaError } = await supabaseAdmin
      .from('rol_personas')
      .insert({
        auth_user_id: userId,
        id_rol: rolData.id_rol
      });

    if (rolPersonaError) throw new Error(`Error al asignar rol: ${rolPersonaError.message}`);

    // RESPUESTA EXITOSA
    return res.status(201).json({
      success: true,
      message: 'Usuario sincronizado correctamente',
      userId: userId
    });

  } catch (error: any) {
    console.error('ERROR WEBHOOK:', error.message);
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};