import { Router } from "express";

import { FrontendController } from "../app/Controllers";

const fe: Router = Router();

fe.get("/groups", FrontendController.getGroups);
fe.get("/groups/:id/products", FrontendController.getProducts);

export default fe;
