import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { UserVal, User, UserInput } from '../../types/User';
import { Result } from '../../types/Result';

export async function updateUser(
  id: string,
  user: UserInput,
): Promise<Result<User>> {
  let token = (await Auth.getSessionToken()) || '';
  let result = await fetchAndParse(`/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': token,
    },
    body: JSON.stringify(user),
  });
  if (!result.success) {
    return result;
  }
  let data = result.data;
  let newUser = UserVal.guard(data.user) ? data.user : null;
  return newUser
    ? { success: true, data: newUser }
    : { success: false, error: 'Response validation error' };
}
