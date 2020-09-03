import { model, Model } from "mongoose";

import { GroupInterface } from "../../types/GroupInterface";
import { GroupSchema } from "../../database/schema/GroupSchema";

export const Group: Model<GroupInterface> = model<GroupInterface>(
  "Group",
  GroupSchema
);
