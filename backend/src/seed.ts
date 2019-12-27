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
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
  })
  .finally(async () => {
    await db.disconnect();
  });
