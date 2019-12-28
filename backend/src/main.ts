import createApp from './helpers/createApp';
import authController from './controllers/auth';
import usersController from './controllers/users';
import propertiesController from './controllers/properties';

let app = createApp();

authController(app);
usersController(app);
propertiesController(app);

app.use((request, response) => {
  response.status(404).json({ error: 'Not found', path: request.path });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://127.0.0.1:3000`);
});
