import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../config/db.config.js";

import PaymentDetailsModel from "../models/paymentDetails.model.js";

// Database connection setup
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    
  },
});
const db = {};
// Initialize models and add them to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.paymentDetailsModel=PaymentDetailsModel(sequelize, DataTypes);



// Export the db object
export default db;
