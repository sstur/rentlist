import {
  Array,
  Literal,
  Number,
  Record,
  Static,
  String,
  Union,
} from 'runtypes';

let ImageVal = Record({
  id: String,
  url: String,
});

let RentalStatusVal = Union(Literal('RENTED'), Literal('AVAILABLE'));

let PropertyVal = Record({
  id: String,
  createdAt: String,
  updatedAt: String,
  name: String,
  description: String,
  floorArea: String,
  price: Number,
  bedCount: Number,
  bathCount: Number,
  address: String,
  lat: Number,
  lng: Number,
  rentalStatus: RentalStatusVal,
  images: Array(ImageVal),
  manager: Record({ name: String, email: String }),
});

let PropertyInputVal = Record({
  name: String,
  description: String,
  floorArea: String,
  price: Number,
  bedCount: Number,
  bathCount: Number,
  address: String,
  lat: Number,
  lng: Number,
  rentalStatus: RentalStatusVal,
  images: String,
});

let PropertyArrayVal = Array(PropertyVal);

type RentalStatus = Static<typeof RentalStatusVal>;
type Property = Static<typeof PropertyVal>;
type PropertyInput = Static<typeof PropertyInputVal>;

export {
  PropertyVal,
  PropertyInputVal,
  PropertyArrayVal,
  RentalStatusVal,
  Property,
  PropertyInput,
  RentalStatus,
};
