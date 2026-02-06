import { compare } from "bcrypt";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { LoginDataType } from "../validations/loginSchema";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth";

class AuthServices {
  async createAuthToken(data: LoginDataType) {
    try {
      const { email, password } = data;

      const user = await prisma.users.findFirst({
        where: { email },
      });

      if (!user) {
        throw new AppError("email or password invalid!", 409);
      }

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) throw new AppError("email or password invalid!", 401);

      const { secret, expiresIn } = authConfig.jwt;

      const token = jwt.sign({ role: user.role ?? "member" }, secret, {
        subject: String(user.id),
        expiresIn,
      });

      return { id: user.id, token };
    } catch (error) {
      throw error;
    }
  }
}
export { AuthServices };
