import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { PropertyArrayVal, Property } from '../../types/Property';
import { Result } from '../../types/Result';

export async function fetchProperties(): Promise<Result<Array<Property>>> {
  let token = (await Auth.getSessionToken()) || '';
  let result = await fetchAndParse('/properties', {
    headers: { 'X-Auth': token },
  });
  if (result.success) {
    let data = result.data;
    let properties = PropertyArrayVal.guard(data.properties)
      ? data.properties
      : [];
    return { success: true, data: properties };
  } else {
    return result;
  }
}
