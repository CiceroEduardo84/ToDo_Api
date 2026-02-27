import z from "zod";

export const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["pending", "in_progress", "completed"]),
  priority: z.enum(["high", "medium", "low"]),
  assigned_to: z.number(),
  team_id: z.number(),
});

export type UserDataType = z.infer<typeof taskSchema>;
