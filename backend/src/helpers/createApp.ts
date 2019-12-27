import express, { Express } from 'express';
import * as bodyParser from 'body-parser';

export default function createApp(): Express {
  const app = express();

  app.use((request, response, next) => {
    response.removeHeader('X-Powered-By');
    next();
  });

  app.use(bodyParser.json());

  return app;
}
