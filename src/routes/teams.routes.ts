import { Router } from "express";
import { verifyUserAuthorization } from "../middlewares/verifyUseAuthorization";
import { TeamsControlers } from "../controllers/teamsControlers";
import { TeamMembersControlers } from "../controllers/teamMembersControllers";

const teamsRoutes = Router();
const teamsControllers = new TeamsControlers();
const teamMembersControllers = new TeamMembersControlers();

// Members
teamsRoutes.get("/:teamId/members", teamMembersControllers.read);

// Teams
teamsRoutes.get("/", teamsControllers.read);

// functions for admin
// Members
teamsRoutes.use(verifyUserAuthorization(["admin"]));
teamsRoutes.post("/:teamId/members", teamMembersControllers.create);
teamsRoutes.delete(
  "/:teamId/members/:userId",
  teamMembersControllers.delete,
);

//Teams
teamsRoutes.post("/", teamsControllers.create);
teamsRoutes.put("/:teamId", teamsControllers.update);
teamsRoutes.delete("/:teamId", teamsControllers.delete);

export { teamsRoutes };
