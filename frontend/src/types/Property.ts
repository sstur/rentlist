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
  rentalStatus: Union(Literal('RENTED'), Literal('AVAILABLE')),
  images: Array(ImageVal),
});

let PropertyArrayVal = Array(PropertyVal);

type Property = Static<typeof PropertyVal>;

export { PropertyVal, PropertyArrayVal, Property };
