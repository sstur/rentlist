import { Express } from 'express';

import db from '../helpers/db';
import { authSession, createSession } from '../helpers/auth';
import { validateHash } from '../helpers/password';
import { AuthInput } from '../types/AuthInput';
import { BAD_REQUEST, FORBIDDEN } from '../constants/response';

export default (app: Express) => {
  app.post('/login', async (request, response) => {
    let data = AuthInput.guard(request.body) ? request.body : null;
    if (!data) {
      return response.status(400).json({ error: BAD_REQUEST });
    }
    let { email, password } = data;
    let user = await db.users.findOne({ where: { email } });
    let isValid = user ? await validateHash(password, user.password) : false;
    if (!user || !isValid) {
      return response.status(401).json({ success: false });
    }
    let token = await createSession(user);
    response.json({ success: true, token });
  });

  app.post('/logout', async (request, response) => {
    let session = await authSession(request.get('X-Auth'));
    if (!session) {
      return response.status(403).json({ error: FORBIDDEN });
    }
    db.sessions.delete({ where: { id: session.id } });
  });
};
