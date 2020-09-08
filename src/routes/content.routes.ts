import { Router } from "express";

import { ContentController } from "../app/Controllers/ContentController";

const content: Router = Router();

content.post("/", ContentController.save);
content.get("/:id", ContentController.details);
content.put("/:id", ContentController.update);

export default content;
