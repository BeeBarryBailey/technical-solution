import { describe, test, expect, beforeEach, vi } from 'vitest';
import { Request, Response } from 'express';
import { getAllHandler } from '../api/handlers';

import VehicleRepository from '../repositories/vehicle-repository';

describe('vehicle search handlers', () => {
  let mockRepo: { getAll: ReturnType<typeof vi.fn> };
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockRepo = {
      getAll: vi.fn(),
    };
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe('getAll handler', () => {
    test('returns 200 and all vehicles', async () => {
      const vehicles = [
        { "price": 9799, "make": "PEUGEOT", "model": "208", "trim": "1.6 BlueHDi 100 GT Line 5dr [non Start Stop]", "colour": "Nera black", "co2_level": 90, "transmission": "Manual", "fuel_type": "Diesel", "engine_size": 1560, "date_first_reg": "19/04/2018", "mileage": 14176 },
        { "price": 12999, "make": "BMW", "model": "1 SERIES", "trim": "118d SE 5dr [Nav]", "colour": "Alpine white", "co2_level": 104, "transmission": "Manual", "fuel_type": "Diesel", "engine_size": 1995, "date_first_reg": "28/12/2017", "mileage": 11271 },
      ];

      mockRepo.getAll.mockReturnValue(vehicles);

      const handler = getAllHandler(
        mockRepo as unknown as VehicleRepository
      );

      await handler(req as Request, res as Response);

      expect(mockRepo.getAll).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: vehicles,
        count: vehicles.length,
      });
    });

    test('returns 500 if repository throws', async () => {
      mockRepo.getAll.mockImplementation(() => {
        throw new Error('failed to fetch vehicles');
      });

      const handler = getAllHandler(
        mockRepo as unknown as VehicleRepository
      );

      await handler(req as Request, res as Response);

      expect(mockRepo.getAll).toHaveBeenCalledOnce();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'failed to fetch vehicles',
      });
    });
  });
});