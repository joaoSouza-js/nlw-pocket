import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoal } from "../../functions/create-goal";

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/api/goal",
		{
			schema: {
				body: z.object({
					title: z.string(),
					desireWeeklyFrequency: z
						.number()
						.int()
						.max(7, "A frequencia do hábito tem que ser menor  ou igual a 7"),
				}),
			},
		},
		async (request, reply) => {
			const { desireWeeklyFrequency, title } = request.body;

			const goalResponse = await createGoal({
				title: title,
				desireWeeklyFrequency: desireWeeklyFrequency,
			});

			reply.status(201).send(goalResponse);
		},
	);
};
