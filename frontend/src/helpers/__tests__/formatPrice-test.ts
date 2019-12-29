import formatPrice from '../formatPrice';

it('should format numbers as price', () => {
  expect(formatPrice(100)).toBe('$1');
  expect(formatPrice(100, 2)).toBe('$1.00');
  expect(formatPrice(123.4)).toBe('$1');
  expect(formatPrice(123.4, 2)).toBe('$1.23');
  expect(formatPrice(123.9, 2)).toBe('$1.24');
  expect(formatPrice(1234567.001, 2)).toBe('$12,345.67');
  expect(formatPrice(12345678, 2)).toBe('$123,456.78');
  expect(formatPrice(123456789, 2)).toBe('$1,234,567.89');
  expect(formatPrice(-123456789, 2)).toBe('$-1,234,567.89');
});
