import { API_URL } from '../constants';
import { Result } from '../types/Result';

export async function fetchAndParse(
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
