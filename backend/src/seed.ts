import { Photon } from '@prisma/photon';
import { generateHash } from './helpers/password';

let photon = new Photon();

async function main() {
  await photon.users.create({
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
    await photon.disconnect();
  });
