import { Router } from "express";
import { SessionControllers } from "../controllers/sessionControlers";

const sessionRoutes = Router();
const sessionControllers = new SessionControllers();

sessionRoutes.post("/signin", sessionControllers.signIn);
sessionRoutes.post("/signup", sessionControllers.SignUp);

export { sessionRoutes };
