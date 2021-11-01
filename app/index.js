import express from 'express';
import mongoose from 'mongoose';
import userRouter from './client/users/index.js';
import vehicleRouter from './client/vehicles/index.js';

const url = 'mongodb://127.0.0.1:27017/cornelius';
await mongoose.connect(url);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = [
  userRouter,
  vehicleRouter
];

for ( const route of routes) {
  app.use('/api/v1', route)
}

app.listen(5000, () => {
  console.log('server is running on port 5000')
});
