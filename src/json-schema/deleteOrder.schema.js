import { z } from "zod";

export const deleteRecordSchema = z.object({
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({ id: z.coerce.number().int().positive(), })
});