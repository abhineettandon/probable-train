import { Router } from "express";

import { FrontEndController } from "../app/Controllers/FrontEndController";

const frontEnd: Router = Router();

frontEnd.get("/products", FrontEndController.getProducts);
frontEnd.get("/products/:id/categories", FrontEndController.getCategories);

export default frontEnd;
