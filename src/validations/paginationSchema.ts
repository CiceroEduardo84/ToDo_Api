import z from "zod";

export const paginationSchema = z.object({
  status: z.enum(["pending", "in_progress", "completed", "all"], {
    message: "Status must be one of: 'pending', 'in_progress' or 'completed'",
  }),

  priority: z.enum(["high", "medium", "low", "all"], {
    message: "priority must be one of: 'low', 'medium' or 'high'",
  }),
});
