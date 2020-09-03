import { Router } from "express";

import { CategoriesController } from "../app/Controllers/CategoriesController";

const catgory: Router = Router();

catgory.get("/", CategoriesController.list);
catgory.post("/", CategoriesController.save);
catgory.put("/:id", CategoriesController.update);

export default catgory;
