import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "delivered", 'shipped']),
    customerName: z.string(),
    productName: z.string(),
  }),
  query: z.object({}),
  params: z.object({})
});