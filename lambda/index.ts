import 'reflect-metadata'; // Import this before any ORM-related code
import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import indexRouter from '../src/routes';
import { initializeDatabase } from '../src/database';
import { cors } from 'hono/cors';

// Create the Hono application instance
const app = new Hono();

// Initialize the database
let isInitialized = false;

const initialize = async () => {
    if (!isInitialized) {
        try {
            await initializeDatabase();
            console.log('Database initialized and ready for requests.');
            isInitialized = true; // Mark as initialized
        } catch (err) {
            console.error('Database initialization failed:', err);
            throw err; // Stop execution if initialization fails
        }
    }
};

// Lambda handler function
export const handler = async (event: any, context: any) => {
    // Ensure database is initialized
    if (!isInitialized) {
        try {
            await initialize(); // Ensure initialization completes
            // Setup routes
            app.get('/', (c) => c.text('Hello Hono!'));
            app.use('/api/*', cors())
            app.route('/api', indexRouter);
        } catch (error) {
            console.error('Initialization failed:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Server error' }),
            };
        }
    }

    // Handle the request using Hono
    return handle(app)(event, context);
};
