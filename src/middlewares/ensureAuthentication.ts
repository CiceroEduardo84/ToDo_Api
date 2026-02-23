import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth";

interface TokenPayLoad {
  role: string;
  sub: string;
}

function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { cookie } = request.headers;
    
    if (!cookie) {
      throw new AppError("Authentication required", 401);
    }

    const [, token] = cookie.split("=");
    
    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayLoad;

    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch{
    throw new AppError("Invalid JWT token", 401);
    
  }
}

export { ensureAuthentication };
