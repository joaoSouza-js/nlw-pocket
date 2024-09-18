import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingSummary } from "../../functions/get-week-pending-summary";

export const getWeePendingSummaryRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/api/goals-summary", async () => {
		const { summary } = await getWeekPendingSummary();

		return {
			summary,
		};
	});
};
