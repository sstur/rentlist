import db from './db';
import { Role } from '@prisma/photon';

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
