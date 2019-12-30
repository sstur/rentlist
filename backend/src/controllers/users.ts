import { Express } from 'express';

import { User } from '@prisma/photon';
import db from '../helpers/db';
import { generateHash } from '../helpers/password';
import { UserInput } from '../types/UserInput';
import { BAD_REQUEST, FORBIDDEN } from '../constants/response';
import formatPhotonError from '../helpers/formatPhotonError';
import { authUser, createSession } from '../helpers/auth';
import { validate as isEmail } from 'isemail';

export default (app: Express) => {
  app.post('/users', async (request, response) => {
    let data = UserInput.guard(request.body) ? request.body : null;
    if (!data) {
      return response.status(400).json({ error: BAD_REQUEST });
    }
    if (data.password.length === 0) {
      return response.status(400).json({ error: 'Password cannot be blank' });
    }
    if (!isEmail(data.email)) {
      return response.status(400).json({ error: 'Invalid Email address' });
    }
    let { name, email, password, role } = data;
    // Only an admin can create users with the following roles.
    if (role === 'ADMIN' || role === 'MANAGER') {
      let authenticatedUser = await authUser(request.get('X-Auth'), {
        ADMIN: true,
      });
      if (!authenticatedUser) {
        return response.status(403).json({ error: FORBIDDEN });
      }
    }
    try {
      let user = await db.users.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: await generateHash(password),
          role: role || 'USER',
        },
      });
      let token = await createSession(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let { password: _, ...safeUserDetails } = user;
      response.json({ success: true, token, user: safeUserDetails });
    } catch (error) {
      // Probably a user already exists with this email address.
      response
        .status(409)
        .json({ success: false, error: formatPhotonError(error) });
    }
  });

  app.put('/users/:id', async (request, response) => {
    let idToEdit = String(request.params.id);
    let data = UserInput.guard(request.body) ? request.body : null;
    if (!data) {
      return response.status(400).json({ error: BAD_REQUEST });
    }
    if (!isEmail(data.email)) {
      return response.status(400).json({ error: 'Invalid Email address' });
    }
    let user = await authUser(request.get('X-Auth'));
    if (!user) {
      return response.status(403).json({ error: FORBIDDEN });
    }
    if (user.role !== 'ADMIN') {
      // Only an admin can edit other users
      if (idToEdit !== user.id) {
        return response.status(403).json({ error: FORBIDDEN });
      }
    }
    let fieldsToUpdate: Partial<User> = {
      name: data.name,
      email: data.email.toLowerCase(),
    };
    let canChangeRole = user.role === 'ADMIN';
    if (canChangeRole && data.role) {
      fieldsToUpdate.role = data.role;
    }
    if (data.password) {
      fieldsToUpdate.password = await generateHash(data.password);
    }
    try {
      let newUser = await db.users.update({
        where: { id: idToEdit },
        data: fieldsToUpdate,
      });
      let token = await createSession(newUser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let { password: _, ...safeUserDetails } = newUser;
      response.json({ success: true, token, user: safeUserDetails });
    } catch (error) {
      // Probably a user already exists with this email address.
      response
        .status(409)
        .json({ success: false, error: formatPhotonError(error) });
    }
  });

  app.delete('/users/:id', async (request, response) => {
    let id = String(request.params.id);
    let user = await authUser(request.get('X-Auth'), { ADMIN: true });
    if (!user) {
      return response.status(403).json({ error: FORBIDDEN });
    }
    await db.sessions.deleteMany({
      where: { user: { id } },
    });
    await db.users.delete({
      where: { id },
    });
    response.json({ success: true });
  });

  app.get('/users', async (request, response) => {
    let user = await authUser(request.get('X-Auth'), { ADMIN: true });
    if (!user) {
      return response.status(403).json({ error: FORBIDDEN });
    }
    let users = await db.users.findMany({
      select: {
        id: true,
        createdAt: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    response.json({ success: true, users });
  });

  app.get('/users/me', async (request, response) => {
    let user = await authUser(request.get('X-Auth'));
    if (user) {
      response.json({ success: true, user });
    } else {
      return response.status(403).json({ error: FORBIDDEN });
    }
  });
};
