import { NextFunction, Request, Response } from "express";
import { UpdateUserService } from "../services/update.service";
import { db } from "@src/database/database.js";

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    db.startSession();

    db.startTransaction();

    const updateUserService = new UpdateUserService(db);
    const result = await updateUserService.handle(req.url.toString().substring(1), req.body);

    await db.commitTransaction();
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
};
