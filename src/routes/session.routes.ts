import { Router } from "express";
import { SessionControllers } from "../controllers/sessionControlers";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const sessionRoutes = Router();
const sessionControllers = new SessionControllers();

sessionRoutes.post("/signin", sessionControllers.SignIn);
sessionRoutes.post("/signup", sessionControllers.SignUp);

sessionRoutes.use(ensureAuthentication);
sessionRoutes.post("/signout", sessionControllers.SignOut);

export { sessionRoutes };
