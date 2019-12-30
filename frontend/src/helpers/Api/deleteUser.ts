import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { Result } from '../../types/Result';

export async function deleteUser(id: string): Promise<Result> {
  let token = (await Auth.getSessionToken()) || '';
  let result = await fetchAndParse(`/users/${id}`, {
    method: 'DELETE',
    headers: {
      'X-Auth': token,
    },
  });
  return result.success ? { success: true } : result;
}
