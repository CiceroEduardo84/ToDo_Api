import { Router } from "express";
import { sessionRoutes } from "./session.routes";
import { teamsRoutes } from "./teams.routes";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { tasksRoutes } from "./tasks.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/session", sessionRoutes);

// Acesso somento após o login
routes.use(ensureAuthentication);
routes.use("/users", userRoutes);
routes.use("/teams", teamsRoutes);
routes.use("/tasks", tasksRoutes);

export { routes };
