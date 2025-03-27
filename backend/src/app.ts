import express from 'express';
import cors from 'cors';
import { AppRouter } from './routes';
import { ORIGIN, CREDENTIALS, VERSION } from './config';
import cookieParser from 'cookie-parser';

export class App {
  public app: express.Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: ORIGIN,
        credentials: CREDENTIALS,
      }),
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.app.get('/', (req, res) => {
      res.send('Server is running!');
    });

    const appRouter = new AppRouter();
    this.app.use(`/api/${VERSION}`, appRouter.router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}