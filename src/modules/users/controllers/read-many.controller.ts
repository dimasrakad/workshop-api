import { NextFunction, Request, Response } from "express";
import { ReadManyUserService } from "../services/read-many.service.js";
import { db } from "@src/database/database.js";

export const readMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    db.startSession();

    db.startTransaction();

    const readManyUserService = new ReadManyUserService(db);
    const result = await readManyUserService.handle();

    await db.commitTransaction();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
