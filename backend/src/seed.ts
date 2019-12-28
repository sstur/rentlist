import db from './helpers/db';
import { generateHash } from './helpers/password';

async function main() {
  await db.users.create({
    data: {
      email: 'sstur@me.com',
      name: 'Simon',
      password: await generateHash('123'),
      role: 'ADMIN',
    },
  });
  await db.users.create({
    data: {
      email: 'otis@example.com',
      name: 'Otis Woods',
      password: await generateHash('123'),
      role: 'MANAGER',
    },
  });
  await db.users.create({
    data: {
      email: 'pamela@example.com',
      name: 'Pamela Ferrell',
      password: await generateHash('123'),
      role: 'MANAGER',
    },
  });
  await db.users.create({
    data: {
      email: 'thelma@example.com',
      name: 'Thelma Alonzo',
      password: await generateHash('123'),
      role: 'MANAGER',
    },
  });
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
  })
  .finally(async () => {
    await db.disconnect();
  });
