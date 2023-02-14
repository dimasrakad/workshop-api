import { NextFunction, Request, Response } from "express";
import { DestroyUserService } from "../services/destroy.service";
import { db } from "@src/database/database.js";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    db.startSession();

    db.startTransaction();

    const destroyUserService = new DestroyUserService(db);
    await destroyUserService.handle(req.url.toString().substring(1));

    await db.commitTransaction();
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
