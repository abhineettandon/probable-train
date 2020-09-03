import { Request, Response } from "express";
import { validate } from "class-validator";

import { Group } from "../Models/Group";
import { GroupInput } from "../Inputs/GroupInput";
import { ValidationErrorResponse } from "../../types/ValidationErrorResponse";

export class GroupsController {
  static list = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const groups = await Group.find({});

      return res.json({ data: { groups } });
    } catch (err) {
      return res.status(500).json({
        message: "Cannot query groups. Something went wrong.",
      });
    }
  };

  static save = async (req: Request, res: Response): Promise<Response> => {
    const input: GroupInput = req.body;

    const groupInput = new GroupInput();

    groupInput.title = input.title;

    const errors = await validate(groupInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      return res
        .status(400)
        .json({ error: { message: "VALIDATIONS_ERROR", info: errorsInfo } });
    }

    try {
      await Group.create({
        title: input.title,
      });

      return res.json({
        message: "Group created successfully. ",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Cannot create Group. Something went wrong.",
      });
    }
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const input: GroupInput = req.body;

    const groupInput = new GroupInput();

    groupInput.title = input.title;

    const errors = await validate(groupInput);

    if (errors.length) {
      const errorsInfo: ValidationErrorResponse[] = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));

      return res
        .status(400)
        .json({ error: { message: "VALIDATIONS_ERROR", info: errorsInfo } });
    }

    try {
      const group = await Group.findByIdAndUpdate(
        id,
        {
          title: input.title,
        },
        {
          new: true,
        }
      );

      if (!group) {
        return res
          .status(404)
          .json({ message: "Group to update does not exists." });
      }

      return res.json({ message: "Group updated successfully." });
    } catch (err) {
      return res.status(500).json({
        message: "Cannot update Group. Something went wrong.",
      });
    }
  };
}
