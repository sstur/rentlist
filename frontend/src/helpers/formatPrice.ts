let commaBoundary = /\B(?=(\d{3})+(?!\d))/g;

export default function formatPrice(value: number, numDecimalPlaces = 0) {
  let stringValue = (value / 100).toFixed(numDecimalPlaces);
  return '$' + stringValue.replace(commaBoundary, ',');
}
