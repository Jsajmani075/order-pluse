import { z } from "zod";

export const updateOrderSchema = z.object({
  body: z.object({
    body: z.object({
      id: z.number().int().positive(),
      status: z.enum(["pending", "delivered", 'shipped']).optional(),
      customerName: z.string().optional(),
      productName: z.string().optional(),
    }),
  }).refine((data) => {
    const { id, ...rest } = data;
    return Object.values(rest).some(v => v !== undefined);
  }, {
    message: "At least one field (other than id) is required"
  }),

  query: z.object({}),
  params: z.object({})
});