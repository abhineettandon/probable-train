import express, { Application } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import { initialize, use } from "passport";
import cors from "cors";

import {
  AuthRotues,
  ProfileRoutes,
  UserRoutes,
  AdminDashboardRoutes,
  GroupRoutes,
  ProductRoutes,
  CategoryRoutes,
  ContentRoutes,
  FrontendRoutes,
} from "./routes";
import { connectDatabase } from "./utils/dbConnection";
import { local, jwt } from "./utils/strategies";
import { OnlyAdmins, Auth } from "./app/Middlewares";

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
    this.app.use(cors());
  }

  regsiterRoutes() {
    this.app.use("/auth", AuthRotues);
    this.app.use("/profile", Auth, ProfileRoutes);
    this.app.use("/users", OnlyAdmins, UserRoutes);
    this.app.use("/dashboard", OnlyAdmins, AdminDashboardRoutes);
    this.app.use("/groups", OnlyAdmins, GroupRoutes);
    this.app.use("/products", OnlyAdmins, ProductRoutes);
    this.app.use("/categories", OnlyAdmins, CategoryRoutes);
    this.app.use("/contents", OnlyAdmins, ContentRoutes);
    this.app.use("/fe/", Auth, FrontendRoutes);
  }

  initializePassportAndStrategies() {
    use("local", local);
    use("jwt", jwt);

    this.app.use(initialize());
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started at port ${this.port}`);
    });
  }
}
