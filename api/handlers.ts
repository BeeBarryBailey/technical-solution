import { Request, Response } from 'express';
import VehicleRepository from '../repositories/vehicle-repository';

// #region: getAll
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
// #endregion
