import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { Result } from '../../types/Result';
import { User, UserVal } from '../../types/User';

type LoginInput = {
  email: string;
  password: string;
};

export async function login(params: LoginInput): Promise<Result<User>> {
  let result = await fetchAndParse('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!result.success) {
    return result;
  }
  let data = result.data;
  let user = UserVal.guard(data.user) ? data.user : null;
  let sessionToken = typeof data.token === 'string' ? data.token : '';
  if (user && sessionToken) {
    await Auth.setSessionToken(sessionToken);
    return { success: true, data: user };
  } else {
    return { success: false, error: 'Response validation error' };
  }
}
