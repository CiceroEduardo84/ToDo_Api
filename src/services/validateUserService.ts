import { prisma } from "../database/prisma";

class ValidateUserService {
  async verify(x: number) {
    try {
      const user = await prisma.users.findFirst({
        where: { id: x },
      });

      if (!user) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export { ValidateUserService };
