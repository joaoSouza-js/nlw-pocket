import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../../functions/get_week-pending-goals";

export const pendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/api/pending-goals", async (request, reply) => {
		const { pendingGoals } = await getWeekPendingGoals();

		return {
			pendingGoals,
		};
	});
};
