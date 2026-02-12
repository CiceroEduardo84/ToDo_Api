import { Router } from "express";

const tasksRoutes = Router();

tasksRoutes.post("/tasks");
tasksRoutes.get("/tasks");
tasksRoutes.put("/tasks/:teamId");
tasksRoutes.delete("/tasks/:teamId");

export { tasksRoutes };
