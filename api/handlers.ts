import { Request, Response } from 'express';
import VehicleRepository from '../repositories/vehicle-repository';

export const getAllHandler = (vehicleRepository: VehicleRepository) => async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleRepository.getAll();

    res.status(200).json({
        data: vehicles,
        count: vehicles.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'failed to fetch vehicles' });
  };
};

export const getByMakeHandler = (vehicleRepository: VehicleRepository) => async (req: Request, res: Response) => {
  const make = req.params.make;

  if (!make) {
    return res.status(400).json({ message: 'make is required' });
  };

  try {
    const vehicles = await vehicleRepository.getByMake(make);

    res.status(200).json({
        data: vehicles,
        count: vehicles.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'failed to fetch vehicles by make' })
  };
};

export const getByModelHandler = (vehicleRepository: VehicleRepository) => async (req: Request, res: Response) => {
  const model = req.params.model;

  if (!model) {
    return res.status(400).json({ message: 'model is required' });
  };

  try {
    const vehicles = await vehicleRepository.getByModel(model);

    res.status(200).json({
        data: vehicles,
        count: vehicles.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'failed to fetch vehicles by model' })
  };
};

export const getByMinPriceHandler = (vehicleRepository: VehicleRepository) => async (req: Request, res: Response) => {
  const minPriceStr = req.params.minPrice;
  const minPrice = Number(minPriceStr);

  if (!minPriceStr) {
    return res.status(400).json({ message: 'minPrice is required' });
  }
  else if (isNaN(minPrice)) {
    return res.status(400).json({ message: 'minPrice must be a number' });
  };

  try {
    const vehicles = await vehicleRepository.getByMinPrice(minPrice);

    res.status(200).json({
        data: vehicles,
        count: vehicles.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'failed to fetch vehicles by minimum price' })
  };
};

export const getByMaxPriceHandler = (vehicleRepository: VehicleRepository) => async (req: Request, res: Response) => {
  const maxPriceStr = req.params.maxPrice;
  const maxPrice = Number(maxPriceStr);

  if (!maxPriceStr) {
    return res.status(400).json({ message: 'maxPrice is required' });
  }
  else if (isNaN(maxPrice)) {
    return res.status(400).json({ message: 'maxPrice must be a number' });
  };

  try {
    const vehicles = await vehicleRepository.getByMaxPrice(maxPrice);

    res.status(200).json({
        data: vehicles,
        count: vehicles.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'failed to fetch vehicles by maximum price' })
  };
};