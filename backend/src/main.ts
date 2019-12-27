import express from 'express';
import bodyParser from 'body-parser';
import { Photon } from '@prisma/photon';
import { generateHash } from './helpers/password';
import { UserInput } from './types/UserInput';
import { BAD_REQUEST } from './constants/response';
import formatPhotonError from './helpers/formatPhotonError';

let photon = new Photon();
let app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('Hello world.');
});

app.post('/users', async (request, response) => {
  let data = UserInput.guard(request.body) ? request.body : null;
  if (!data) {
    return response.status(400).json({ error: BAD_REQUEST });
  }
  let { name, email, password } = data;
  try {
    let result = await photon.users.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: await generateHash(password),
      },
    });
    response.json({ success: true, id: result.id });
  } catch (error) {
    // Likely the email already exists.
    response
      .status(409)
      .send({ success: false, error: formatPhotonError(error) });
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://127.0.0.1:3000`);
});
