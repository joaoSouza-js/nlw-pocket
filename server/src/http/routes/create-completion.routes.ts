import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoalCompletion } from "../../functions/create-goal-completion";

export const createCompletionRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/api/goals-completions",
		{
			schema: {
				body: z.object({
					goalId: z.string().cuid2({ message: "deve ser um cuid2" }),
				}),
			},
		},
		async (request, reply) => {
			const { goalId } = request.body;

			await createGoalCompletion({
				goalId: goalId,
			});

			return reply.status(201);
		},
	);
};
