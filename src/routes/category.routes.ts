import { Router } from "express";

import { CategoryConroller } from "../app/Controllers/CategoryController";

const category: Router = Router();

category.get("/", CategoryConroller.list);
category.post("/", CategoryConroller.save);

export default category;
