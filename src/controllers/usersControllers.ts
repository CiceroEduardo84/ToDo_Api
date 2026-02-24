import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

class UsersControllers {
  async read(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await prisma.users.findMany();

      return response.status(201).json({ users });
    } catch (error) {
      return next(error);
    }
  }
}

export { UsersControllers };
