export type Property = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  floorArea: string;
  price: number;
  bedCount: number;
  bathCount: number;
  address: string;
  lat: number;
  lng: number;
  rentalStatus: 'RENTED' | 'AVAILABLE';
  images: Array<{ id: string; url: string }>;
};
