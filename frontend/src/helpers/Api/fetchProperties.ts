import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { Property } from '../../types/Property';
import { Result } from '../../types/Result';

export async function fetchProperties(): Promise<Result<Array<Property>>> {
  let token = (await Auth.getSessionToken()) || '';
  let result = await fetchAndParse('/properties', {
    headers: { 'X-Auth': token },
  });
  if (result.success) {
    return { success: true, data: result.data.properties };
  } else {
    return result;
  }
}
