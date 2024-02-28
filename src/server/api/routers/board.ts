import { z } from "zod";

const BoardUpdateInputShema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  updatedAt: z.date(),
  userId: z.string(),
});

import { createTRPCRouter, protectedProcedure } from "Y/server/api/trpc";

export const boardRouter = createTRPCRouter({
  update: protectedProcedure
    .input(BoardUpdateInputShema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.board.upsert({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        update: {
          text: input.text,
          updatedAt: input.updatedAt,
        },
        create: {
          id: input.id,
          text: input.text,
          userId: ctx.session.user.id,
          updatedAt: input.updatedAt,
        },
      });
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    const board = await ctx.db.board.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return board;
  }),
});
