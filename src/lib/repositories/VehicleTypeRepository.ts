import { vehicleTypes } from '../data';
import { VehicleType } from '../types';

export class VehicleTypeRepository {
  async getAll(): Promise<VehicleType[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(vehicleTypes as VehicleType[]), 100);
    });
  }

  async getById(id: string): Promise<VehicleType | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const type = vehicleTypes.find((t) => t.id.toLowerCase() === id.toLowerCase());
        resolve(type as VehicleType | undefined);
      }, 100);
    });
  }
}

export const vehicleTypeRepository = new VehicleTypeRepository();
