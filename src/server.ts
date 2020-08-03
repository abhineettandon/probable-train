import express, { Application } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { AuthRotues } from './routes';
import { connectDatabase } from './utils/dbConnection'

export class Server {
  public app: Application;

  public port: String;

  constructor(port: String) {
    this.app = express();

    this.port = port;

    this.registerMiddlewares();

    this.regsiterRoutes();

    connectDatabase();
  }

  registerMiddlewares() {
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  regsiterRoutes() {
    this.app.use('/auth', AuthRotues);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started at port ${this.port}`);
    })
  }
}