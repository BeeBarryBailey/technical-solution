import fs from "fs";

export type Vehicle = {
  price: number,
  make: string;
  model: string;
  trim: string;
  colour: string;
  transmission: string;
  fuel_type: string;
  engine_size: string;
  date_first_reg: string;
  mileage: number;
};

export class VehicleRepository {
  private _vehicles: Vehicle[];

  constructor() {
    const file = fs.readFileSync("./repositories/vehicles.json", "utf8");
    this._vehicles = JSON.parse(file);
  };

  getAll(): Vehicle[] {
    return this._vehicles;
  };

  getByMake(make: string): Vehicle[] {
    return this._vehicles.filter(
      vehicle => vehicle.make.toLowerCase() === make.toLowerCase()
    );
  };

  getByModel(model: string): Vehicle[] {
    return this._vehicles.filter(
      vehicle => vehicle.model.toLowerCase() === model.toLowerCase()
    );
  };

  getByMinPrice(minPrice: number): Vehicle[] {
    return this._vehicles.filter(
      vehicle => vehicle.price >= minPrice
    );
  };

  getByMaxPrice(maxPrice: number): Vehicle[] {
    return this._vehicles.filter(
      vehicle => vehicle.price <= maxPrice
    );
  };
};

export default VehicleRepository;
