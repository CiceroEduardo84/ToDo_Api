import { Router } from "express";
import { verifyUserAuthorization } from "../middlewares/verifyUseAuthorization";
import { TeamsControlers } from "../controllers/teamsControlers";
import { TeamMembersControlers } from "../controllers/teamMembersControllers";

const teamsRoutes = Router();
const teamsControllers = new TeamsControlers();
const teamMembersControllers = new TeamMembersControlers();

// Members
teamsRoutes.get("/teams/:teamId/members", teamMembersControllers.read);

teamsRoutes.use(verifyUserAuthorization(["admin"]));
teamsRoutes.post("/teams/:teamId/members", teamMembersControllers.create);
teamsRoutes.delete(
  "/teams/:teamId/members/:userId",
  teamMembersControllers.delete,
);

//Teams
teamsRoutes.post("/teams", teamsControllers.create);
teamsRoutes.get("/teams", teamsControllers.read);
teamsRoutes.put("/teams/:teamId", teamsControllers.update);
teamsRoutes.delete("/teams/:teamId", teamsControllers.delete);

export { teamsRoutes };
