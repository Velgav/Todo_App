import * as z from "zod";

export const schema = z.object({
  taskName: z.string().min(2),
  categoryId: z.number().min(1),
});

export type TaskFormData = z.infer<typeof schema>;
