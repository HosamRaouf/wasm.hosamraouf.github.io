import { brands } from '../data';
import { Brand } from '../types';

export class BrandRepository {
  async getAll(): Promise<Brand[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(brands as Brand[]), 100);
    });
  }

  async getById(id: string): Promise<Brand | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const brand = brands.find((b) => b.id.toLowerCase() === id.toLowerCase());
        resolve(brand as Brand | undefined);
      }, 100);
    });
  }

  async getPopular(limit = 6): Promise<Brand[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const popular = [...brands]
          .sort((a, b) => b.count - a.count)
          .slice(0, limit);
        resolve(popular as Brand[]);
      }, 100);
    });
  }
}

export const brandRepository = new BrandRepository();
