import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './db';


const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
    app.listen('3000');
    console.log('Server started on port 3000');
  } catch (error) {
    console.log(error);
  }
}

main();