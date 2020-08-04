import express, { Application } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { initialize, use } from 'passport';

import { AuthRotues } from './routes';
import { connectDatabase } from './utils/dbConnection'
import { local } from './utils/strategies';

export class Server {
  public app: Application;

  public port: String;

  constructor(port: String) {
    this.app = express();

    this.port = port;

    this.registerMiddlewares();

    this.regsiterRoutes();

    this.initializePassportAndStrategies();

    connectDatabase();
  }

  registerMiddlewares() {
    this.app.use(helmet());
    this.app.use(bodyParser.json());
  }

  regsiterRoutes() {
    this.app.use('/auth', AuthRotues);
  }

  initializePassportAndStrategies() {
    use('local', local);
    
    this.app.use(initialize());
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started at port ${this.port}`);
    })
  }
}