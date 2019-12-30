import { Express } from 'express';

import db from '../helpers/db';
import { FORBIDDEN, BAD_REQUEST } from '../constants/response';
import { authUser } from '../helpers/auth';
import { PropertyInput } from '../types/PropertyInput';

const selectFields = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  description: true,
  floorArea: true,
  price: true,
  bedCount: true,
  bathCount: true,
  address: true,
  lat: true,
  lng: true,
  images: true,
  rentalStatus: true,
  // TODO: We really just need a way to exclude user password without
  // writing this whole massive select clause above.
  manager: { select: { id: true, name: true, email: true } },
};

export default (app: Express) => {
  app.get('/properties', async (request, response) => {
    let user = await authUser(request.get('X-Auth'));
    if (!user) {
      return response.status(403).json({ error: FORBIDDEN });
    }
    let properties = await db.properties.findMany({
      select: selectFields,
      orderBy: { createdAt: 'desc' },
    });
    response.json({ success: true, properties });
  });

  app.post('/properties', async (request, response) => {
    let user = await authUser(request.get('X-Auth'), {
      MANAGER: true,
      ADMIN: true,
    });
    if (!user) {
      return response.status(403).json({ error: FORBIDDEN });
    }
    let data = PropertyInput.guard(request.body) ? request.body : null;
    if (!data) {
      return response.status(400).json({ error: BAD_REQUEST });
    }
    let {
      name,
      description,
      floorArea,
      price,
      bedCount,
      bathCount,
      address,
      lat,
      lng,
      rentalStatus,
      images,
    } = data;
    let property = await db.properties.create({
      data: {
        name,
        description,
        floorArea,
        price: price * 100,
        bedCount,
        bathCount,
        address,
        lat,
        lng,
        rentalStatus,
        images: {
          create: images
            .split('\n')
            .filter((url) => url.length !== 0)
            .map((url) => ({ url })),
        },
        manager: { connect: { id: user.id } },
      },
      select: selectFields,
    });
    response.json({ success: true, property });
  });

  app.put('/properties/:id', async (request, response) => {
    let idToEdit = String(request.params.id);
    let user = await authUser(request.get('X-Auth'), {
      MANAGER: true,
      ADMIN: true,
    });
    if (!user) {
      return response.status(403).json({ error: FORBIDDEN });
    }
    let data = PropertyInput.guard(request.body) ? request.body : null;
    if (!data) {
      return response.status(400).json({ error: BAD_REQUEST });
    }
    let {
      name,
      description,
      floorArea,
      price,
      bedCount,
      bathCount,
      address,
      lat,
      lng,
      rentalStatus,
      images,
    } = data;
    // This is suboptimal; deleting old images before adding new.
    await db.images.deleteMany({ where: { property: { id: idToEdit } } });
    let property = await db.properties.update({
      where: { id: idToEdit },
      data: {
        name,
        description,
        floorArea,
        price: price * 100,
        bedCount,
        bathCount,
        address,
        lat,
        lng,
        rentalStatus,
        images: {
          create: images
            .split('\n')
            .filter((url) => url.length !== 0)
            .map((url) => ({ url })),
        },
      },
      select: selectFields,
    });
    response.json({ success: true, property });
  });

  app.delete('/properties/:id', async (request, response) => {
    let id = String(request.params.id);
    let user = await authUser(request.get('X-Auth'), {
      MANAGER: true,
      ADMIN: true,
    });
    if (!user) {
      return response.status(403).json({ error: FORBIDDEN });
    }
    await db.properties.delete({ where: { id } });
    response.json({ success: true });
  });
};
