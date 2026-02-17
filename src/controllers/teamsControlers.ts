import { NextFunction, Request, Response } from "express";
import { teamsSchema } from "../validations/teamsSchema";
import { prisma } from "../database/prisma";

class TeamsControlers {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, description } = teamsSchema.parse(request.body);

      await prisma.teams.create({
        data: {
          name,
          description,
        },
      });

      return response.status(201).json({ message: "Team created!" });
    } catch (error) {
      return next(error);
    }
  }
  async read(request: Request, response: Response, next: NextFunction) {}
  async update(request: Request, response: Response, next: NextFunction) {}
  async delete(request: Request, response: Response, next: NextFunction) {}
}

export { TeamsControlers };
