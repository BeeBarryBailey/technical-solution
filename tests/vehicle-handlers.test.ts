import { describe, test, expect, beforeEach, vi } from 'vitest';
import { Request, Response } from 'express';
import { getAllHandler, getByMakeHandler, getByModelHandler } from '../api/handlers';

import VehicleRepository from '../repositories/vehicle-repository';

describe('vehicle search handlers', () => {
  let mockRepo: { 
    getAll: ReturnType<typeof vi.fn>,
    getByMake: ReturnType<typeof vi.fn>,
    getByModel: ReturnType<typeof vi.fn>,
  };
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockRepo = {
      getAll: vi.fn(),
      getByMake: vi.fn(),
      getByModel: vi.fn(),
    };
    mockReq = {};
    mockRes = {
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

      const handler = getAllHandler(mockRepo as unknown as VehicleRepository);

      await handler(mockReq as Request, mockRes as Response);

      expect(mockRepo.getAll).toHaveBeenCalledOnce();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: vehicles,
        count: vehicles.length,
      });
    });

    test('returns 500 if repository throws', async () => {
      mockRepo.getAll.mockImplementation(() => {
        throw new Error('failed to fetch vehicles');
      });

      const handler = getAllHandler(mockRepo as unknown as VehicleRepository);

      await handler(mockReq as Request, mockRes as Response);

      expect(mockRepo.getAll).toHaveBeenCalledOnce();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'failed to fetch vehicles',
      });
    });
  });

  describe('getByMake handler', () => {
    test('returns 200 and vehicles for a valid make', async () => {
      const vehicles = [
          { "price": 12999, "make": "BMW", "model": "1 SERIES", "trim": "118d SE 5dr [Nav]", "colour": "Alpine white", "co2_level": 104, "transmission": "Manual", "fuel_type": "Diesel", "engine_size": 1995, "date_first_reg": "28/12/2017", "mileage": 11271 },
      ];

      mockRepo.getByMake.mockReturnValue(vehicles);
      mockReq = { params: { make: 'BMW'} };

      const handler = getByMakeHandler(mockRepo as unknown as VehicleRepository);

      await handler(mockReq as Request, mockRes as Response);

      expect(mockRepo.getByMake).toHaveBeenCalledOnce();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: vehicles,
        count: vehicles.length,
      });
    });

    test('returns 400 if make is missing', async () => {
      mockReq = { params: {} };

      const handler = getByMakeHandler(mockRepo as unknown as VehicleRepository);

      await handler(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'make is required' });
    });

    test('returns 500 if repository throws', async () => {
      mockRepo.getByMake.mockRejectedValue(new Error('database error'));
      mockReq = { params: { make: 'BMW' } };

      const handler = getByMakeHandler(mockRepo as unknown as VehicleRepository);
      
      await handler(mockReq as Request, mockRes as Response);

      expect(mockRepo.getByMake).toHaveBeenCalledOnce();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'failed to fetch vehicles by make',
      })
    });

    test('returns 200 and empty array if make does not exist', async () => {
      mockRepo.getByMake.mockResolvedValue([]);
      mockReq = { params: { make: 'notARealMake' } };

      const handler = getByMakeHandler(mockRepo as unknown as VehicleRepository);

      await handler(mockReq as Request, mockRes as Response);

      expect(mockRepo.getByMake).toHaveBeenCalledOnce();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: [],
        count: 0,
      });
    });
  });

  describe('getByModel handler', () => {
    test('returns 200 and vehicles for a valid model', async () => {
      const vehicles = [
          { "price": 12999, "make": "BMW", "model": "1 SERIES", "trim": "118d SE 5dr [Nav]", "colour": "Alpine white", "co2_level": 104, "transmission": "Manual", "fuel_type": "Diesel", "engine_size": 1995, "date_first_reg": "28/12/2017", "mileage": 11271 },
      ];

      mockRepo.getByModel.mockReturnValue(vehicles);
      mockReq = { params: { model: '1 SERIES'} };

      const handler = getByModelHandler(mockRepo as unknown as VehicleRepository);

      await handler(mockReq as Request, mockRes as Response);

      expect(mockRepo.getByModel).toHaveBeenCalledOnce();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: vehicles,
        count: vehicles.length,
      });
    });

    test('returns 400 if model is missing', async () => {
      mockReq = { params: {} };

      const handler = getByModelHandler(mockRepo as unknown as VehicleRepository);

      await handler(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'model is required' });
    });

    test('returns 500 if repository throws', async () => {
      mockRepo.getByModel.mockRejectedValue(new Error('database error'));
      mockReq = { params: { model: '1 SERIES' } };

      const handler = getByModelHandler(mockRepo as unknown as VehicleRepository);
      
      await handler(mockReq as Request, mockRes as Response);

      expect(mockRepo.getByModel).toHaveBeenCalledOnce();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'failed to fetch vehicles by model',
      })
    });

    test('returns 200 and empty array if model does not exist', async () => {
      mockRepo.getByModel.mockResolvedValue([]);
      mockReq = { params: { model: 'notARealModel' } };

      const handler = getByModelHandler(mockRepo as unknown as VehicleRepository);

      await handler(mockReq as Request, mockRes as Response);

      expect(mockRepo.getByModel).toHaveBeenCalledOnce();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: [],
        count: 0,
      });
    });
  })
});

