import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { PropertyVal, Property, PropertyInput } from '../../types/Property';
import { Result } from '../../types/Result';

export async function updateProperty(
  id: string,
  property: PropertyInput,
): Promise<Result<Property>> {
  let token = (await Auth.getSessionToken()) || '';
  let result = await fetchAndParse(`/properties/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': token,
    },
    body: JSON.stringify(property),
  });
  if (!result.success) {
    return result;
  }
  let data = result.data;
  let newProperty = PropertyVal.guard(data.property) ? data.property : null;
  return newProperty
    ? { success: true, data: newProperty }
    : { success: false, error: 'Response validation error' };
}
