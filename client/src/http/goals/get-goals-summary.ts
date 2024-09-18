import type { GOALS_SUMMARY_DTO } from "../../DTO/GOALS_SUMMARY_DTO";
import { api } from "../../services/axios";

type getGoalsSummaryResponse = {
	summary: GOALS_SUMMARY_DTO;
};

export async function getGoalsSummaryController(): Promise<GOALS_SUMMARY_DTO> {
	const response = await api.get<getGoalsSummaryResponse>("/goals-summary");
	const summary = response.data.summary;
	return summary;
}
