// //app/config/db.config.js   

import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {                // FossGen Aidxpert Server 
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DB: process.env.DB_NAME,
        dialect: "postgres",
        port: process.env.DB_PORT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };
    
    export default dbConfig;






