import { Context } from 'hono';
import jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export const authMiddleware = async (c: Context, next: () => Promise<void>) => {
    const authHeader = c.req.header('Authorization');
    console.log('its in the middleware');
    
    if (!authHeader) {
        return c.json({ message: 'No token provided' }, 401);
    }

    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, SECRET_KEY);
        await next();
    } catch (error: any) {
        return c.json({ message: 'Invalid or expired token', error: error.message }, 401);
    }
};
