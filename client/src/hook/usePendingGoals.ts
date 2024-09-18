import { useCallback, useEffect, useState } from "react";
import type { GOALS_SUMMARY_DTO } from "../DTO/GOALS_SUMMARY_DTO";
import { getGoalsSummaryController } from "../http/goals/get-goals-summary";

export function useGoalsSummary() {
	const [goalsSummary, setGoalsSummary] = useState<GOALS_SUMMARY_DTO | null>(
		null,
	);
	const [isLoadingGoalsSummary, setIsLoadingGoalsSummary] = useState(true);

	const fetchGoalsSummary = useCallback(async () => {
		setIsLoadingGoalsSummary(true);

		try {
			const response = await getGoalsSummaryController();
			await new Promise((resolve) => {
				setTimeout(resolve, 200);
			});
			setGoalsSummary(response);
			console.log(response.total);
		} catch (error) {
			window.alert("Algo deu errado");
		} finally {
			setIsLoadingGoalsSummary(false);
		}
	}, []);

	useEffect(() => {
		fetchGoalsSummary();
	}, [fetchGoalsSummary]);

	return {
		goalsSummary: goalsSummary,
		isLoadingGoalsSummary: isLoadingGoalsSummary,
	};
}
