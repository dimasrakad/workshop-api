import { NextFunction, Request, Response } from "express";
import { ReadUserService } from "../services/read.service.js";
import { db } from "@src/database/database.js";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const readUserService = new ReadUserService(db);
    const result = await readUserService.handle(req.url.toString().substring(1), { session });

    await db.commitTransaction();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
