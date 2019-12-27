import * as crypto from 'crypto';

function randomBytes(n: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(n, (error, result) => {
      error ? reject(error) : resolve(result);
    });
  });
}

function computeHash(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 48, (error, derivedHash) => {
      error ? reject(error) : resolve(derivedHash);
    });
  });
}

export async function generateHash(password: string) {
  let salt = await randomBytes(18);
  let derivedHash = await computeHash(password, salt);
  return salt.toString('base64') + ':' + derivedHash.toString('base64');
}

export async function validateHash(
  password: string,
  saltedHash: string,
): Promise<boolean> {
  let [salt, expectedHash] = saltedHash.split(':');
  if (!salt || !expectedHash) {
    return false;
  }
  let derivedHash = await computeHash(password, Buffer.from(salt, 'base64'));
  return derivedHash.toString('base64') === expectedHash;
}
