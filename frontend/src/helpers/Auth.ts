import { AsyncStorage } from 'react-native';

const SESSION_TOKEN_KEY = '@Auth:sessionToken';

export async function getSessionToken() {
  return await AsyncStorage.getItem(SESSION_TOKEN_KEY);
}

export async function setSessionToken(sessionToken: string) {
  await AsyncStorage.setItem(SESSION_TOKEN_KEY, sessionToken);
}

export async function clearSessionToken() {
  await AsyncStorage.removeItem(SESSION_TOKEN_KEY);
}
