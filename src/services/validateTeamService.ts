import { prisma } from "../database/prisma";

class ValidateTeamService {
  async verify(x: number) {
    try {
      const team = await prisma.teams.findFirst({
        where: { id: x },
      });

      if (!team) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export { ValidateTeamService };
