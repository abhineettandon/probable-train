import { Router } from "express";

import { ProductCategoryController } from "../app/Controllers/ProductCategoryController";

const productCategory: Router = Router();

productCategory.get("/", ProductCategoryController.list);
productCategory.post("/", ProductCategoryController.save);
productCategory.put("/:id", ProductCategoryController.update);

export default productCategory;
