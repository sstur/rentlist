import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { Result } from '../../types/Result';

type LoginInput = {
  email: string;
  password: string;
};

export async function login(params: LoginInput): Promise<Result> {
  let result = await fetchAndParse('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (result.success) {
    let data = result.data;
    let sessionToken = data && typeof data.token === 'string' ? data.token : '';
    await Auth.setSessionToken(sessionToken);
    return { success: true };
  } else {
    return result;
  }
}
