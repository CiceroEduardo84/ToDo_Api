import z from "zod";

export const teamsSchema = z.object({
  name: z.string().min(10),
  description: z.string().optional(),
});
