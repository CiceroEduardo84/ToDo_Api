import { NextFunction, Request, Response } from "express";
import { taskSchema } from "../validations/taskSchema";
import { ValidateUserService } from "../services/validateUserService";
import { ValidateTeamService } from "../services/validateTeamService";
import { AppError } from "../utils/AppError";
import { prisma } from "../database/prisma";

class TasksControllers {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { title, description, status, priority, assigned_to, team_id } =
        taskSchema.parse(request.body);

      const validateUserService = new ValidateUserService();
      const validateteamService = new ValidateTeamService();

      if (
        !title ||
        !description ||
        !status ||
        !priority ||
        !assigned_to ||
        !team_id
      ) {
        throw new AppError("Dados insuficientes!", 400);
      }

      const resultUser = await validateUserService.verify(assigned_to);
      const resultTeamn = await validateteamService.verify(team_id);

      if (!resultUser || !resultTeamn) {
        throw new AppError("Usuário ou time não encontrado.", 404);
      }

      const alreadyMember = await prisma.team_Members.findFirst({
        where: {
          userId: assigned_to,
          teamId: team_id,
        },
      });

      if (!alreadyMember) {
        throw new AppError("Usuário não faz parte do time.", 409);
      }

      await prisma.tasks.create({
        data: {
          title,
          description,
          status,
          priority,
          assigned_to,
          team_id,
        },
      });

      return response
        .status(201)
        .json({ message: "Task successfully assigned!" });
    } catch (error) {
      next(error);
    }
  }
  async read(request: Request, response: Response, next: NextFunction) {
    try {
      const tasks = await prisma.tasks.findMany();

      return response.status(201).json({ tasks });
    } catch (error) {
      return next(error);
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { taskId } = request.params;
      const { title, description, status, priority, assigned_to, team_id } =
        taskSchema.parse(request.body);

      const validateUserService = new ValidateUserService();
      const validateteamService = new ValidateTeamService();

      if (
        !title ||
        !description ||
        !status ||
        !priority ||
        !assigned_to ||
        !team_id
      ) {
        throw new AppError("Dados insuficientes!", 400);
      }

      const resultUser = await validateUserService.verify(assigned_to);
      const resultTeamn = await validateteamService.verify(team_id);

      if (!resultUser || !resultTeamn) {
        throw new AppError("Usuário ou time não encontrado.", 404);
      }

      const alreadyMember = await prisma.team_Members.findFirst({
        where: {
          userId: assigned_to,
          teamId: team_id,
        },
      });

      if (!alreadyMember) {
        throw new AppError("Usuário não faz parte do time.", 409);
      }

      const taskValidate = await prisma.tasks.findFirst({
        where: {
          id: Number(taskId),
        },
      });

      if (!taskValidate) {
        throw new AppError("Tarefa não foi encontrada.", 409);
      }

      await prisma.tasks.update({
        data: {
          title,
          description,
          status,
          priority,
          assigned_to,
          team_id,
        },
        where: { id: Number(taskId) },
      });

      return response
        .status(201)
        .json({ message: "Task successfully updated!" });
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { taskId } = request.params;

      const taskValidate = await prisma.tasks.findFirst({
        where: {
          id: Number(taskId),
        },
      });

      if (!taskValidate) {
        throw new AppError("Tarefa não foi encontrada.", 409);
      }

      await prisma.tasks.delete({
        where: { id: Number(taskId) },
      });

      return response.status(201).json({ message: "Task deleted!" });
    } catch (error) {
      return next(error);
    }
  }
}

export { TasksControllers };
