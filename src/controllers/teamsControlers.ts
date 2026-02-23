import { NextFunction, Request, Response } from "express";
import { teamsSchema } from "../validations/teamsSchema";
import { prisma } from "../database/prisma";
import z, { number } from "zod";

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
  async read(request: Request, response: Response, next: NextFunction) {
    try {
      const teams = await prisma.teams.findMany();

      return response.status(201).json({ teams });
    } catch (error) {
      return next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { teamId } = request.params;
      const { name, description } = teamsSchema.parse(request.body);

      await prisma.teams.update({
        data: {
          name,
          description,
        },
        where: { id: Number(teamId) },
      });

      return response.status(201).json({ message: "Team updated!" });
    } catch (error) {
      return next(error);
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { teamId } = request.params;

      await prisma.teams.delete({
        where: { id: Number(teamId) },
      });

      return response.status(201).json({ message: "Team deleted!" });
    } catch (error) {
      return next(error);
    }
  }
}

export { TeamsControlers };
