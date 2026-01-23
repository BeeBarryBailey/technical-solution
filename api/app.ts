import express from 'express';
import VehicleRepository from '../repositories/vehicle-repository';
import { getAllHandler, getByMakeHandler } from './handlers';

export const app = express();
// app.use(express.json()); # for POST

const vehicleRepository = new VehicleRepository();

app.get('/vehicles', getAllHandler(vehicleRepository));

app.get('/vehicles/make/:make', getByMakeHandler(vehicleRepository));
app.get('/vehicles/make', (req, res) => {
  res.status(400).json({ message: 'make is required' });
});