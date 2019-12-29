import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { Result } from '../../types/Result';

export async function checkAuth(): Promise<Result> {
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
    return { success: true };
  } else {
    return result;
  }
}
