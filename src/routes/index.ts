import { Router } from "express";
import { sessionRoutes } from "./session.routes";

const routes = Router();

routes.use("/session", sessionRoutes);

export { routes };
