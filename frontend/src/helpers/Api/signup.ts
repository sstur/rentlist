import * as Auth from '../Auth';
import { fetchAndParse } from '../fetch';
import { Result } from '../../types/Result';

type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export async function signup(params: SignupInput): Promise<Result> {
  let result = await fetchAndParse('/users', {
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
