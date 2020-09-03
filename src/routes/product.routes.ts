import { Router } from "express";

import { ProductsController } from "../app/Controllers/";

const product: Router = Router();

product.get("/", ProductsController.list);
product.get("/:id", ProductsController.details);
product.post("/", ProductsController.save);
product.put("/:id", ProductsController.update);

export default product;
