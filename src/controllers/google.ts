/* Manejar peticiones HTTP */

import {Request, Response} from "express";
import {getAuthUrl, getTokens, createCalendarEvent
} from "../services/googleCalendar";
import { createClient } from '@supabase/supabase-js';
import { AuthRequest } from "../middlewares/auth.middleware";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonymousKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonymousKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

/* URL del Frontend para iniciar la conexión entre Oauth2 y Google */
export const connectGoogle = (req: AuthRequest, res: Response) => {
  const url = getAuthUrl(req.user!.id);
  res.json({url});
};

export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const userId = req.query.state as string;

  try {
    const tokens = await getTokens(code);

    // Guarda tokens en Supabase
    const { data, error } = await supabaseAdmin
      .from('google_oauth_tokens')
      .insert({
        user_id: userId,
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token,
        expires_at: tokens.expiry_date ? new Date(tokens.expiry_date) : null
      });

    if (error) {
      console.error('Error guardando tokens:', error);
      return res.status(500).json({ error: 'Error guardando tokens' });
    }

    console.log(`Tokens guardados para usuario ${userId}`);

    res.send("Google Calendar conectado");
  } catch (error) {
    console.error('Error en callback:', error);
    res.status(500).json({error});
  }
};

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { summary, startDate, startTime, endDate, endTime, description, location, clientId } = req.body;
    const userId = req.user!.id;

    // Obtener refresh_token de la DB
    const { data: tokenData, error: tokenError } = await supabase
      .from('google_oauth_tokens')
      .select('refresh_token')
      .eq('user_id', userId)
      .single();

    if (tokenError || !tokenData) {
      return res.status(400).json({ error: 'No se encontró refresh_token para este usuario' });
    }

    const refreshToken = tokenData.refresh_token;

    const event = {
      summary,
      start: {
        dateTime: `${startDate}T${startTime}:00`,
        timeZone: "America/Santiago"
      },
      end: {
        dateTime: `${endDate}T${endTime}:00`,
        timeZone: "America/Santiago"
      },
      description,
      location
    };

    const result = await createCalendarEvent(refreshToken, event);

    // Insertar en sesiones_coaching
    const sessionInsert = await supabaseAdmin
      .from('sesiones_coaching')
      .insert({
        id_sesion: crypto.randomUUID(),
        id_cliente: clientId,
        id_coach: userId,
        fecha_hora: new Date(`${startDate}T${startTime}:00`),
        estado: 'pendiente'
      });

    if (sessionInsert.error) {
      console.error('Error al crear la sesión', sessionInsert.error);
    }

    res.json(result);

  } catch (error) {
    res.status(500).json({error});
  }
};