import { api } from "../../services/axios";
import type { PENDING_GOAL_DTO } from "../../DTO/PENDING_GOAL_DTO";
type getPendingGoalsResponse = {
	pendingGoals: PENDING_GOAL_DTO[];
};

export async function getPendingGoalsController(): Promise<PENDING_GOAL_DTO[]> {
	const response = await api.get<getPendingGoalsResponse>("/pending-goals");
	return response.data.pendingGoals;
}
