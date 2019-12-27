import { Express } from 'express';

import db from '../helpers/db';
import { generateHash } from '../helpers/password';
import { UserInput } from '../types/UserInput';
import { BAD_REQUEST, FORBIDDEN } from '../constants/response';
import formatPhotonError from '../helpers/formatPhotonError';
import { authUser } from '../helpers/auth';

export default (app: Express) => {
  app.post('/users', async (request, response) => {
    let data = UserInput.guard(request.body) ? request.body : null;
    if (!data) {
      return response.status(400).json({ error: BAD_REQUEST });
    }
    let { name, email, password, role } = data;
    // Only an admin can create users with the following roles.
    if (role === 'ADMIN' || role === 'MANAGER') {
      let authenticated = await authUser(request.get('X-Auth'), {
        ADMIN: true,
      });
      if (!authenticated) {
        return response.status(403).json({ error: FORBIDDEN });
      }
    }
    try {
      let result = await db.users.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: await generateHash(password),
          role: role || 'USER',
        },
      });
      response.json({ success: true, id: result.id });
    } catch (error) {
      // Probably a user already exists with this email address.
      response
        .status(409)
        .json({ success: false, error: formatPhotonError(error) });
    }
  });
};
