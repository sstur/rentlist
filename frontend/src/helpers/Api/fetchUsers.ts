import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { UserArrayVal, User } from '../../types/User';
import { Result } from '../../types/Result';

export async function fetchUsers(): Promise<Result<Array<User>>> {
  let token = (await Auth.getSessionToken()) || '';
  let result = await fetchAndParse('/users', {
    headers: { 'X-Auth': token },
  });
  if (result.success) {
    let data = result.data;
    let users = UserArrayVal.guard(data.users) ? data.users : [];
    return { success: true, data: users };
  } else {
    return result;
  }
}
