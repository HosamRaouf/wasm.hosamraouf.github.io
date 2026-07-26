import { cars } from '../data';
import { Car } from '../types';

export class CarRepository {
  async getAll(): Promise<Car[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(cars as Car[]), 100);
    });
  }

  async getById(id: string): Promise<Car | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const car = cars.find((c) => c.id === id);
        resolve(car as Car | undefined);
      }, 100);
    });
  }

  async getFeatured(): Promise<Car[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = cars.slice(0, 6);
        resolve(featured as Car[]);
      }, 100);
    });
  }

  async getAuctions(): Promise<Car[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const auctions = cars.filter((c) => c.isAuction);
        resolve(auctions as Car[]);
      }, 100);
    });
  }

  async getByBrand(brandId: string): Promise<Car[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = cars.filter((c) => c.brand.toLowerCase() === brandId.toLowerCase());
        resolve(filtered as Car[]);
      }, 100);
    });
  }

  async getByType(typeId: string): Promise<Car[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = cars.filter((c) => c.type.toLowerCase() === typeId.toLowerCase());
        resolve(filtered as Car[]);
      }, 100);
    });
  }
}

export const carRepository = new CarRepository();
