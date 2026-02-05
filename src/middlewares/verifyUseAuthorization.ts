import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

function verifyUserAuthorization(role: string[]) {
  return (response: Response, request: Request, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Unauthorized!", 401);
    }

    if (!role.includes(request.user.role)) {
      throw new AppError("Unauthorized!", 401);
    }

    next();
  };
}

export { verifyUserAuthorization };
