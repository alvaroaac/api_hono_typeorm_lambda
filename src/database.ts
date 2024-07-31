import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Insurance } from './entity/Insurance';
import { User } from './entity/User'; 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "bemtevi-development.cdgkm8a06tqs.sa-east-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "bemtevi-development",
    ssl: {
        rejectUnauthorized: false, // Adjust this based on your SSL requirements
    },
    synchronize: true,
    logging: false,
    entities: [User, Insurance],
    migrations: [],
    subscribers: [],
})

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('LOG: Data Source has been initialized!');
    } catch (err) {
        console.error('Error during Data Source initialization:', err);
    }
};
