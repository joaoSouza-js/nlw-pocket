import type { FastifyInstance } from "fastify";
import { createGoalRoute } from "./create-goal.routes";
import { pendingGoalsRoute } from "./pending-goals.routes";
import { createCompletionRoute } from "./create-completion.routes";
import { getWeePendingSummaryRoute } from "./get-week-pending-summary.routes";

export async function routes(app: FastifyInstance) {
	app.register(createGoalRoute);
	app.register(pendingGoalsRoute);
	app.register(createCompletionRoute);
	app.register(getWeePendingSummaryRoute);
}
