import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import allComponentsRoutes from './app/routes/allComponents.routes.js';
import db from './app/config/index.js';


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', allComponentsRoutes);



app.get('/', (req, res) => {
  res.send('Welcome to AidXpert Application.');
});

app.all('*', (req, res) => {
  res.send('Route does not exist.');
});

// const PORT = 8080;
const PORT = process.env.PORT || 8080;
db.sequelize.sync({ force: false, alter: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}).catch((err) => {
  console.error('Failed to sync db: ', err.message);
});