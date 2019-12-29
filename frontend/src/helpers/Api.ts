import * as Auth from './Auth';
import { API_URL } from '../constants';
import { Property } from '../types/Property';

type ResultSuccess<T> = T extends undefined
  ? {
      success: true;
      data?: undefined;
    }
  : {
      success: true;
      data: T;
    };

type ResultFailure = {
  success: false;
  statusCode?: number;
  // In theory we should present a "retry" option for network errors.
  networkError?: true;
  error: string;
};

type Result<T = undefined> = ResultSuccess<T> | ResultFailure;

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

export async function fetchProperties(): Promise<Result<Array<Property>>> {
  let token = (await Auth.getSessionToken()) || '';
  let result = await fetchAndParse('/properties', {
    headers: { 'X-Auth': token },
  });
  if (result.success) {
    return { success: true, data: result.data.properties };
  } else {
    return result;
  }
}

async function fetchAndParse(
  path: string,
  options: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Result<any>> {
  let response;
  try {
    response = await fetch(url(path), options);
  } catch (error) {
    return { success: false, error: error.message, networkError: true };
  }
  let statusCode = response.status;
  let contentType = getContentType(response);
  let data = null;
  if (contentType === 'application/json') {
    try {
      data = await response.json();
    } catch (error) {
      return {
        success: false,
        statusCode,
        error: error.message,
        networkError: true,
      };
    }
  }
  if (response.ok && data) {
    return { success: true, data: data };
  } else {
    return {
      success: false,
      statusCode,
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
