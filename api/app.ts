import express from 'express';
import VehicleRepository from '../repositories/vehicle-repository';
import { getAllHandler } from './handlers';

export const app = express();
// app.use(express.json()); # for POST

const vehicleRepository = new VehicleRepository();

app.get('/vehicles', getAllHandler(vehicleRepository));