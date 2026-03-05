import { Router } from "express";
import { UsersControllers } from "../controllers/usersControllers";
import { verifyUserAuthorization } from "../middlewares/verifyUseAuthorization";

const userRoutes = Router();
const usersControllers = new UsersControllers();

userRoutes.get("/", verifyUserAuthorization(["admin"]),usersControllers.read);

export { userRoutes };
