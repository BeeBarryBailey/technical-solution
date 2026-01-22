import express, { Express, Request, Response } from 'express';
import VehicleRepository from './repositories/vehicle-repository';

const app: Express = express();
const port = 3000;
const vehicleRepository = new VehicleRepository;

// split into handlers and endpoints for unit testing

export const getAll = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleRepository.getAll();

    res.status(200).json({
      data: vehicles,
      count: vehicles.length,
    });
  } catch (error) {
    res.status(404).json({ message: 'Failed to fetch vehicles'})
  }
};

app.get('/vehicles', getAll);

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
