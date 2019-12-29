import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { Result } from '../../types/Result';

export async function logout(): Promise<Result> {
  let token = await Auth.getSessionToken();
  if (token == null) {
    return { success: true };
  }
  let result = await fetchAndParse('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': token,
    },
    body: JSON.stringify({}),
  });
  if (result.success) {
    await Auth.clearSessionToken();
    return { success: true };
  } else {
    return result;
  }
}
