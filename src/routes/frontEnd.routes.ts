import { Router } from "express";

import { FrontEndController } from "../app/Controllers/FrontEndController";

const frontEnd: Router = Router();

frontEnd.get("/products", FrontEndController.getProducts);

export default frontEnd;
