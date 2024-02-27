import { z } from "zod";

const BoardCreateInputShema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  updatedAt: z.date(),
  userId: z.string(),
});

import { createTRPCRouter, protectedProcedure } from "Y/server/api/trpc";

export const boardRouter = createTRPCRouter({
  create: protectedProcedure
    .input(BoardCreateInputShema)
    .mutation(async ({ ctx, input }) => {}),
});
