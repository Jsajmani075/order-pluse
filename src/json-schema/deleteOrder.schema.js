import { z } from "zod";

export const deleteRecordSchema = z.object({
  body: z.object({
    id: z.number().int().positive(),
  }),
  query: z.object({}),
  params: z.object({})
});