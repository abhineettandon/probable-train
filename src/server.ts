import express, { Application } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { initialize, use } from 'passport';

import { AuthRotues, UserRoutes } from './routes';
import { connectDatabase } from './utils/dbConnection'
import { local, jwt } from './utils/strategies';
import { OnlyAdmins } from './app/Middlewares';

export class Server {
  public app: Application;

  public port: String;

  constructor(port: String) {
    this.app = express();

    this.port = port;

    this.registerMiddlewares();

    this.initializePassportAndStrategies();
    
    this.regsiterRoutes();

    connectDatabase();
  }

  registerMiddlewares() {
    this.app.use(helmet());
    this.app.use(bodyParser.json());
  }

  regsiterRoutes() {
    this.app.use('/auth', AuthRotues);
    this.app.use('/users', OnlyAdmins, UserRoutes);
  }

  initializePassportAndStrategies() {
    use('local', local);
    use('jwt', jwt);

    this.app.use(initialize());
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started at port ${this.port}`);
    })
  }
}