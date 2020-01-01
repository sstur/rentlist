import { User } from '@prisma/photon';
import db from './helpers/db';
import { generateHash } from './helpers/password';
import * as fixtures from './fixtures';

async function main() {
  let users: Array<User> = [];
  for (let input of fixtures.users) {
    let user = await db.users.create({
      data: {
        ...input,
        password: await generateHash(input.password),
      },
    });
    if (user.role === 'MANAGER') {
      users.push(user);
    }
  }
  for (let { key, ...input } of fixtures.properties) {
    // Use a deterministic way to randomly assign a manager.
    let userIndex = parseInt(key.slice(-8), 16) % users.length;
    let user = users[userIndex];
    await db.properties.create({
      data: {
        ...input,
        images: { create: input.images.map((url) => ({ url })) },
        manager: { connect: { id: user.id } },
      },
    });
  }
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
  })
  .finally(async () => {
    await db.disconnect();
  });
