import express from 'express';
import bodyParser from 'body-parser';
import { Photon } from '@prisma/photon';
import { generateHash } from './helpers/password';

let photon = new Photon();
let app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('Hello world.');
});

app.post('/users', async (request, response) => {
  let { name, email, password } = request.body;
  let result = await photon.users.create({
    data: {
      name,
      email,
      password: await generateHash(password),
    },
  });
  response.json(result);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://127.0.0.1:3000`);
});
