import { Router } from "express";

import { GroupsController } from "../app/Controllers/GroupsController";

const group: Router = Router();

group.get("/", GroupsController.list);
group.post("/", GroupsController.save);
group.put("/:id", GroupsController.update);

export default group;
