/** NODE MODULES */
import express from 'express';
import cors from 'cors'
import debug from 'debug'
const serverLog = debug('node:')

/** ENVIRONNEMNT */
import * as dotenv from 'dotenv'
dotenv.config()

/** OWN MODULES */
import { UnknownRoutesHandler } from '@/middlewares/unknownRoutes.handler';
import { ExceptionsHandler } from '@/middlewares/exceptions.handler';
import { Success } from './middlewares/success.mw';
import BaseRoute from '@/router/v1/routes/Base.routes';
import { PrismaExceptionsHandler } from './middlewares/prismaExceptions.handler';
import { AuthService } from './auth/auth.service';

class App {
  public app: express.Application;
  private hostname = process.env.URL_API!.replace(/https?:\/\//, '');
  private port: number = Number(process.env.PORT_API);;

  constructor(routes: BaseRoute[]) {
    this.app = express();

    this.initializeMiddlewaresBeforeRoutes();
    this.initializeRoutes(routes);
    this.initializeMiddlewaresAfterRoutes();
  }

  private initializeMiddlewaresBeforeRoutes() {
    this.app
      .use(cors())
      .use(express.json())
      .use(AuthService.getAuthentification())
  }

  private initializeRoutes(routes: BaseRoute[]) {
    routes.forEach((route: BaseRoute) => { this.app.use('/v1', route.router); });
  }

  private initializeMiddlewaresAfterRoutes() {
    this.app
      .use(Success)
      .use(PrismaExceptionsHandler)
      .all('*', UnknownRoutesHandler)
      .use(ExceptionsHandler)
  }

  public listen() {
    this.app.listen(this.port, this.hostname, () => {
      serverLog("The server work on http://" + this.hostname + ":" + this.port);
    });
  }
}

export default App;