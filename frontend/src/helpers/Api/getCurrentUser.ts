import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { Result } from '../../types/Result';
import { UserVal, User } from '../../types/User';

export async function getCurrentUser(): Promise<Result<User>> {
  let token = await Auth.getSessionToken();
  if (token == null) {
    return {
      success: false,
      error: 'No session token available',
    };
  }
  let result = await fetchAndParse('/users/me', {
    headers: { 'X-Auth': token },
  });
  if (result.success) {
    let user = UserVal.guard(result.data.user) ? result.data.user : null;
    return user
      ? { success: true, data: user }
      : { success: false, error: 'Response validation error' };
  } else {
    return result;
  }
}
