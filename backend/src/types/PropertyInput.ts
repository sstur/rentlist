import { Literal, Number, Record, String, Union } from 'runtypes';

let RentalStatus = Union(Literal('RENTED'), Literal('AVAILABLE'));

let PropertyInput = Record({
  name: String,
  description: String,
  floorArea: String,
  price: Number,
  bedCount: Number,
  bathCount: Number,
  address: String,
  lat: Number,
  lng: Number,
  rentalStatus: RentalStatus,
  images: String,
});

export { PropertyInput, RentalStatus };
