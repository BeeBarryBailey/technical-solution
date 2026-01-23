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
    }
};

export const getByMakeHandler = (vehicleRepository: VehicleRepository) => async (req: Request, res: Response) => {
    const make = req.params.make;
    
    if (!make || typeof make !== 'string') {
        return res.status(400).json({ message: 'make is required' });
    }

    try {
        const vehicles = await vehicleRepository.getByMake(make);

        res.status(200).json({
            data: vehicles,
            count: vehicles.length,
        });
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch vehicles by make' })
    }
}