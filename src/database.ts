import { AppDataSource } from './data-source';

const database = async () => {
    await AppDataSource.initialize()
}

database().then(rs => {
    console.log('Successfully connected');
}).catch(err => {
    console.error(err)
})