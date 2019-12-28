import * as Auth from './Auth';
import { API_URL } from '../constants';

type ResultSuccess<T> = T extends undefined
  ? {
      success: true;
      data?: undefined;
    }
  : {
      success: true;
      data: T;
    };

type ResultFailure<T> = {
  success: false;
  statusCode?: number;
  error: string;
};

type Result<T = undefined> = ResultSuccess<T> | ResultFailure<T>;

type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export async function signup(params: SignupInput): Promise<Result> {
  let response = await fetch(url('/users'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  let contentType = getContentType(response);
  let data = contentType === 'application/json' ? await response.json() : null;
  if (response.ok) {
    let sessionToken = data && typeof data.token === 'string' ? data.token : '';
    await Auth.setSessionToken(sessionToken);
    return { success: true };
  } else {
    let error = typeof data.error === 'string' ? data.error : '';
    return { success: false, statusCode: response.status, error };
  }
}

type LoginInput = {
  email: string;
  password: string;
};

export async function login(params: LoginInput): Promise<Result> {
  let response = await fetch(url('/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  let contentType = getContentType(response);
  let data = contentType === 'application/json' ? await response.json() : null;
  if (response.ok) {
    let sessionToken = data && typeof data.token === 'string' ? data.token : '';
    await Auth.setSessionToken(sessionToken);
    return { success: true };
  } else {
    let error = typeof data.error === 'string' ? data.error : '';
    return { success: false, statusCode: response.status, error };
  }
}

export async function checkAuth(): Promise<Result> {
  let token = await Auth.getSessionToken();
  if (token == null) {
    return {
      success: false,
      error: 'No session token available',
    };
  }
  let response = await fetch(url('/users/me'), {
    headers: { 'X-Auth': token },
  });
  let contentType = getContentType(response);
  let data = contentType === 'application/json' ? await response.json() : null;
  if (response.ok) {
    return { success: true };
  } else {
    return {
      success: false,
      statusCode: response.status,
      error: data && typeof data.error === 'string' ? data.error : '',
    };
  }
}

export async function logout(): Promise<Result> {
  let token = await Auth.getSessionToken();
  if (token == null) {
    return { success: true };
  }
  let response = await fetch(url('/logout'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': token,
    },
    body: JSON.stringify({}),
  });
  let contentType = getContentType(response);
  let data = contentType === 'application/json' ? await response.json() : null;
  if (response.ok) {
    await Auth.clearSessionToken();
    return { success: true };
  } else {
    return {
      success: false,
      statusCode: response.status,
      error: data && typeof data.error === 'string' ? data.error : '',
    };
  }
}

function url(path: string) {
  return API_URL + path;
}

function getContentType(response: Response) {
  let value = response.headers.get('Content-Type');
  return value ? value.toLowerCase().split(';')[0] : '';
}
