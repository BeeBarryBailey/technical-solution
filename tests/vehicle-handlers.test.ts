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
        { make: 'Toyota', model: 'Corolla', trim: 'LE', colour: 'Blue' },
        { make: 'Honda', model: 'Civic', trim: 'EX', colour: 'Red' },
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