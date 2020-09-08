import { Router } from "express";

import { ContentController } from "../app/Controllers/ContentController";

const content: Router = Router();

content.post("/", ContentController.save);
content.get("/:id", ContentController.details);
content.patch("/:id", ContentController.update);
content.put("/:id", ContentController.savePost);

export default content;
