import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ValidateUserService } from "../services/validateUserService";
import { ValidateTeamService } from "../services/validateTeamService";
import { prisma } from "../database/prisma";

class TeamMembersControlers {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { teamId } = request.params;
      const { userId } = request.body;

      const validateUserService = new ValidateUserService();
      const validateteamService = new ValidateTeamService();

      if (!teamId || !userId) {
        throw new AppError("Dados insuficientes!", 400);
      }

      const resultUser = await validateUserService.verify(Number(userId));
      const resultTeamn = await validateteamService.verify(Number(teamId));

      if (!resultUser || !resultTeamn) {
        throw new AppError("Usuário ou time não encontrado.", 404);
      }

      const alreadyMember = await prisma.team_Members.findFirst({
        where: {
          userId: Number(userId),
          teamId: Number(teamId),
        },
      });

      if (alreadyMember) {
        throw new AppError("Usuário já faz parte do time.", 409);
      }

      await prisma.team_Members.create({
        data: {
          userId: Number(userId),
          teamId: Number(teamId),
        },
      });

      return response
        .status(201)
        .json({ message: "Member added to the team!" });
    } catch (error) {
      next(error);
    }
  }

  async read(request: Request, response: Response, next: NextFunction) {
    try {
      const { teamId } = request.params;

      const validateteamService = new ValidateTeamService();

      if (!teamId) {
        throw new AppError("Dados insuficientes!", 400);
      }

      const resultTeamn = await validateteamService.verify(Number(teamId));

      if (!resultTeamn) {
        throw new AppError("Time não encontrado.", 404);
      }

      const members = await prisma.team_Members.findMany({
        where: { teamId: Number(teamId) },
        include: {
          team: true,
          user: true,
        },
      });

      return response.status(201).json({ members });
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { teamId } = request.params;
      const { userId } = request.body;

      const validateUserService = new ValidateUserService();
      const validateteamService = new ValidateTeamService();

      if (!teamId || !userId) {
        throw new AppError("Dados insuficientes!", 400);
      }

      const resultUser = await validateUserService.verify(Number(userId));
      const resultTeamn = await validateteamService.verify(Number(teamId));

      if (!resultUser || !resultTeamn) {
        throw new AppError("Usuário ou time não encontrado.", 404);
      }

      await prisma.team_Members.deleteMany({
        where: {
          userId: Number(userId),
          teamId: Number(teamId),
        },
      });

      return response
        .status(201)
        .json({ message: "Member deleted to the team!" });
    } catch (error) {
      next(error);
    }
  }
}

export { TeamMembersControlers };
