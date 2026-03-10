import {Request, Response, NextFunction} from 'express';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonymousKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonymousKey); /* Si falla es por usar ANON y no SERVICE_KEY*/

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email?: string;
    };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: 'Autenticación inválida'});
        }

        const token = authHeader.split(' ')[1];
        const {data: {user}, error} = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(400).json({ error: 'Autenticación inválida' });
        }

        req.user = {
            id: user.id,
            email: user.email,
        }
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        return res.status(500).json({ error: 'Error de autenticación' });
    };
};

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: 'Error de autenticación' });
        }

        const {data, error} = await supabase.from('rol_personas')
            .select('id_rol_persona, rol!inner (nombre_rol)')
            .eq('auth_user_id', userId)
            .eq('rol.nombre_rol', 'admin').single();

        if (error || !data) {
            return res.status(400).json({ error: 'Acceso denegado' });
        }
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        return res.status(500).json({ error: 'Error de autenticación' });
    }
};


//INTERCEPTA LA LLAMADA DE ERP Y VERIFICA SI TRAE EL TOKEN CORRECTO ANTES DE LA BD

export const verifyErpToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-webhook-token'];

    if (token !== process.env.WEBHOOK_SECRET) {
        return res.status(401).json({ error: 'Token de ERP inválido' });
    }
    next();
}