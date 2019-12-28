import { Role, User } from '@prisma/photon';

import db from './db';
import getRandomBytes from './getRandomBytes';

type Roles = { [K in Role]?: boolean };

export async function authSession(authToken: string | undefined) {
  let [sessionID, sessionToken] = authToken ? authToken.split(':') : [];
  if (!sessionID || !sessionToken) {
    return null;
  }
  let session = await db.sessions.findOne({
    where: { id: sessionID },
    include: { user: true },
  });
  return session && session.token === sessionToken ? session : null;
}

export async function authUser(authToken: string | undefined, roles?: Roles) {
  let session = await authSession(authToken);
  let user = session ? session.user : null;
  let isRolePermitted = true;
  if (user && roles) {
    isRolePermitted = roles[user.role] === true;
  }
  return user && isRolePermitted ? user : null;
}

export async function createSession(user: User) {
  let bytes = await getRandomBytes(18);
  let session = await db.sessions.create({
    data: {
      token: bytes.toString('base64'),
      user: { connect: { id: user.id } },
    },
  });
  return session.id + ':' + session.token;
}
