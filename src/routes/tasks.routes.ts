import { Router } from "express";
import { TasksControllers } from "../controllers/tasksControllers";

const tasksRoutes = Router();
const tasksControllers = new TasksControllers();

tasksRoutes.post("/", tasksControllers.create);
tasksRoutes.get("/",tasksControllers.read);
tasksRoutes.put("/:teamId", tasksControllers.update);
tasksRoutes.delete("/:teamId", tasksControllers.delete);

export { tasksRoutes };
