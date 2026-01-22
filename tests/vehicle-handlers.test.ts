import { describe, test, expect } from 'vitest';
import request from 'supertest';

import { VehicleRepository } from '../repositories/vehicle-repository';

import {app} from '../index';

describe("vehicle repository endpoint requests", () => {
    test("valid GET /vehicles request returns 200 and all vehicles", async () => {
        const vehicleRepo = new VehicleRepository;
        const response = await request(app).get('/vehicles');

        const vehicles = vehicleRepo.getAll();

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(vehicles.length);
    });

    test("valid GET /vehicles/make request returns 200 and all vehicles by make", async () => {

    });

    test("valid GET /vehicles/model request returns 200 and all vehicles by model", async () => {

    });

    test("valid GET /vehicles/minPrice request returns 200 and all vehicles by minimum price", async () => {

    });

    test("valid GET /vehicles/maxPrice request returns 200 and all vehicles by maximum price", async () => {

    });

    test("valid GET /vehicles/minMaxPrice request returns 200 and all vehicles by minimum and maximum price", async () => {

    });

    test("valid GET /vehicles/mileage request returns 200 and all vehicles by mileage", async () => {

    });

    test("valid POST /vehicles request returns 200 and adds a new vehicle to the dataset", async () => {

    });

    test("invalid GET request returns 404 and empty array", async () => {

    });

    test("invalid POST request returns 404", async () => {

    });
});