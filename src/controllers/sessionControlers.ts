import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { loginSchema } from "../validations/loginSchema";
import { userSchema } from "../validations/userSchema";
import { AuthServices } from "../services/authServices";
import { hash } from "bcrypt";
import { env } from "../validations/envSchema";

class SessionControllers {
  async signIn(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(request.body);
      const authServices = new AuthServices();
      
      const { id, token } = await authServices.createAuthToken({
        email,
        password,
      });

      response.cookie(env.KEY_TOKEN, token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 18,
      });

      return response
        .status(200)
        .json({ message: "Login completed sucessfully!", id });
    } catch (error) {
      return next(error);
    }
  }

  async SignUp(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password } = userSchema.parse(request.body);

      const emailExists = await prisma.users.findUnique({
        where: { email },
      });

      if (emailExists) {
        return new AppError("Email already exists!", 409);
      }

      const passwordHash = await hash(password, 10);

      await prisma.users.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });

      return response.status(201).json({ message: "User created!" });
    } catch (error) {
      return next(error);
    }
  }
}

export { SessionControllers };
