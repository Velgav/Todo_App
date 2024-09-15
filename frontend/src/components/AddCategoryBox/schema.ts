import * as z from "zod";

export const schema = z.object({
  name: z.string().min(2),
});

export type CategoryFormData = z.infer<typeof schema>;
