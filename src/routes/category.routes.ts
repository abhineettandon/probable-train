import { Router } from "express";

import { CategoryConroller } from "../app/Controllers/CategoryController";

const category: Router = Router();

category.get("/", CategoryConroller.list);
category.post("/", CategoryConroller.save);
category.get("/:id", CategoryConroller.details);
category.put("/:id", CategoryConroller.update);
category.get("/:id/contents", CategoryConroller.getContents);

export default category;
