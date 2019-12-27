import createApp from './helpers/createApp';
import authController from './controllers/auth';
import usersController from './controllers/users';

let app = createApp();

authController(app);
usersController(app);

app.use((request, response) => {
  response.status(404).json({ error: 'Not found', path: request.path });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://127.0.0.1:3000`);
});
