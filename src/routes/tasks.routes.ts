import { Router } from "express";
import { TasksControllers } from "../controllers/tasksControllers";
import { verifyUserAuthorization } from "../middlewares/verifyUseAuthorization";

const tasksRoutes = Router();
const tasksControllers = new TasksControllers();

tasksRoutes.get("/",tasksControllers.read);
tasksRoutes.put("/:taskId", tasksControllers.update);

tasksRoutes.use(verifyUserAuthorization(["admin"]))
tasksRoutes.post("/", tasksControllers.create);
tasksRoutes.delete("/:taskId", tasksControllers.delete);

export { tasksRoutes };
