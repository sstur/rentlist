import { API_URL } from '../constants';
import { Result } from '../types/Result';
import { JsonValue, JsonObject } from '../types/JsonValue';

export async function fetchAndParse(
  path: string,
  options: RequestInit,
): Promise<Result<JsonObject>> {
  let response;
  try {
    response = await fetch(url(path), options);
  } catch (error) {
    return { success: false, error: error.message, networkError: true };
  }
  let statusCode = response.status;
  let contentType = getContentType(response);
  let value: JsonValue = null;
  if (contentType === 'application/json') {
    try {
      value = await response.json();
    } catch (error) {
      return {
        success: false,
        statusCode,
        error: error.message,
        networkError: true,
      };
    }
  }
  let data = isObject(value) ? value : { value };
  if (response.ok) {
    return { success: true, data };
  } else {
    return {
      success: false,
      statusCode,
      error: typeof data.error === 'string' ? data.error : '',
    };
  }
}

function isObject(value: JsonValue): value is JsonObject {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function url(path: string) {
  return API_URL + path;
}

function getContentType(response: Response) {
  let value = response.headers.get('Content-Type');
  return value ? value.toLowerCase().split(';')[0] : '';
}
