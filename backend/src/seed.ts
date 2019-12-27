import { Photon } from '@prisma/photon';

let photon = new Photon();

async function main() {
  await photon.users.create({
    data: {
      email: 'sstur@me.com',
      name: 'Simon',
      password: '123',
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
