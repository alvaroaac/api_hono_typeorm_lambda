import { Context } from 'hono';
import { User } from '../entity/User';
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export const signUp = async (c: Context) => {
    try {
        console.log('Entered the controller');
        
        const { email, password, firstName, lastName } = await c.req.json();
        if (!email || !password) {
            return c.json({ message: 'Email and Password are mandatory' }, 400)
        }
        // console.log('User info: ', JSON.stringify({ email, password }));
        // Check if the user already exists
        const existingUser = await User.findOneBy({ email });
        if (existingUser) {
            return c.json({ message: 'User already exists' }, 400);
        }

        // Hash the password and save the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.create({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        return c.json({ message: 'User created successfully' }, 201);
    } catch (error: any) {
        return c.json({ message: 'Error signing up', error: error.message }, 500);
    }
};

export const signIn = async (c: Context) => {
    try {
        
        const { email, password } = await c.req.json();
        if (!email || !password) {
            return c.json({ message: 'Email and Password are mandatory' }, 400)
        }
        const user = await User.findOneBy({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return c.json({ message: 'Invalid credentials' }, 401);
        }
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: 36000 });
        return c.json({ token });
    } catch (error: any) {
        console.log('Erro ao sign-in: ', error);
        
        return c.json({ message: 'Error signing in', error: error.message }, 500);
    }
};
