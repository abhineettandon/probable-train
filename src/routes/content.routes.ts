import { Router } from "express";

import { ContentController } from "../app/Controllers/ContentController";

const content: Router = Router();

content.post("/", ContentController.save);
content.get("/:id", ContentController.details);
content.patch("/:id", ContentController.update);
content.put("/:id", ContentController.savePostToSubCategory);
content.get("/:id/:postId", ContentController.getPostFromSubCategory);
content.patch("/:id/:postId", ContentController.updatePostFromSubCategory);
content.delete("/:id", ContentController.destroy);
content.delete("/:id/:postId", ContentController.destroyPostFromSubCategory);

export default content;
