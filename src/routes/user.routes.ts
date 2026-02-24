import { Router } from "express";
import { UsersControllers } from "../controllers/usersControllers";

const userRoutes = Router();
const usersControllers = new UsersControllers();

userRoutes.get("/", usersControllers.read);

export { userRoutes };
