import { Express } from 'express';

import db from '../helpers/db';
import { FORBIDDEN } from '../constants/response';
import { authUser } from '../helpers/auth';

export default (app: Express) => {
  app.get('/properties', async (request, response) => {
    let user = await authUser(request.get('X-Auth'));
    if (!user) {
      return response.status(403).json({ error: FORBIDDEN });
    }
    let properties = await db.properties.findMany({
      include: { images: true },
      orderBy: { createdAt: 'desc' },
    });
    response.json({ success: true, properties });
  });
};
