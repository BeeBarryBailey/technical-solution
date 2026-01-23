import express from 'express';
import VehicleRepository from '../repositories/vehicle-repository';
import { 
  getAllHandler,
  getByMakeHandler, 
  getByModelHandler,
  getByMinPriceHandler,
  getByMaxPriceHandler
} from './handlers';

export const app = express();

const vehicleRepository = new VehicleRepository();

app.get('/vehicles', getAllHandler(vehicleRepository));

app.get('/vehicles/make/:make', getByMakeHandler(vehicleRepository));
app.get('/vehicles/make', (req, res) => {
  res.status(400).json({ message: 'make is required' });
});

app.get('/vehicles/model/:model', getByModelHandler(vehicleRepository));
app.get('/vehicles/model', (req, res) => {
  res.status(400).json({ message: 'model is required' });
});

app.get('/vehicles/minPrice/:minPrice', getByMinPriceHandler(vehicleRepository));
app.get('/vehicles/minPrice', (req, res) => {
    res.status(400).json({ message: 'minimum price is required' });
});

app.get('/vehicles/maxPrice/:maxPrice', getByMaxPriceHandler(vehicleRepository));
app.get('/vehicles/maxPrice', (req, res) => {
    res.status(400).json({ message: 'maximum price is required' });
});