import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';

type MiddlewareError = Error & {
  status?: number;
};
type NextFn = () => void;

export default function createApp(): Express {
  const app = express();

  app.use((request, response, next) => {
    response.removeHeader('X-Powered-By');
    next();
  });

  app.use(bodyParser.json());

  // Correctly handle JSON parsing errors.
  app.use(
    (
      error: MiddlewareError | undefined,
      request: Request,
      response: Response,
      next: NextFn,
    ) => {
      if (error && error instanceof SyntaxError && error.status === 400) {
        response.status(400).json({ error: error.message });
      } else {
        next();
      }
    },
  );

  return app;
}
