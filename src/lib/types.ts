export interface Seller {
  name: string;
  rating: number;
  reviews: number;
}

export interface Car {
  id: string;
  name: string;
  nameAr: string;
  brand: string;
  brandAr: string;
  type: string;
  typeAr: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel: string;
  color: string;
  colorEn: string;
  location: string;
  locationEn: string;
  price: number;
  startingBid: number | null;
  image: string;
  badge: string | null;
  engine: string;
  power: string;
  torque: string;
  drivetrain: string;
  acceleration: string;
  fuelEconomy: string;
  dimensions: string;
  weight: string;
  interior: string;
  wheels: string;
  climate: string;
  seller: Seller;
  features: string[];
  isAuction: boolean;
  currentBid?: number;
  bidCount?: number;
  lastBidTime?: string;
  endsAt?: number;
}

export interface Brand {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  count: number;
}

export interface VehicleType {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  count: number;
}
