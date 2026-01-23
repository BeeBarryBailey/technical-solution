import fs from "fs";

export type Vehicle = {
  make: string;
  model: string;
  trim: string;
  colour: string;
};

export class VehicleRepository {
  private _vehicles: Vehicle[];

  constructor() {
    const file = fs.readFileSync("./repositories/vehicles.json", "utf8");
    this._vehicles = JSON.parse(file);
  }

  getAll(): Vehicle[] {
    return this._vehicles;
  }

  getByMake(make: string): Vehicle[] {
    return this._vehicles.filter(
      vehicle => vehicle.make.toLowerCase() === make.toLowerCase()
    );
  }

  getByModel(model: string): Vehicle[] {
    return this._vehicles.filter(
      vehicle => vehicle.model.toLowerCase() === model.toLowerCase()
    );
  }
}

export default VehicleRepository;
