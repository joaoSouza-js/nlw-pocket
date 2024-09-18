import { useCallback, useEffect, useState } from "react";
import type { PENDING_GOAL_DTO } from "../DTO/PENDING_GOAL_DTO";
import { getPendingGoalsController } from "../http/goals/get-pending-goals";

export function usePendingGoals() {
	const [pendingGoals, setPendingGoals] = useState<PENDING_GOAL_DTO[] | null>(
		null,
	);
	const [isLoadingPendingGoals, setIsLoadingPendingGoals] = useState(true);

	const fetchPendingGoals = useCallback(async () => {
		setIsLoadingPendingGoals(true);

		try {
			const response = await getPendingGoalsController();
			await new Promise((resolve) => {
				setTimeout(resolve, 200);
			});
			setPendingGoals(response);
		} catch (error) {
			window.alert("Algo deu errado");
		} finally {
			setIsLoadingPendingGoals(false);
		}
	}, []);

	useEffect(() => {
		fetchPendingGoals();
	}, [fetchPendingGoals]);

	return {
		pendingGoals,
		isLoadingPendingGoals: isLoadingPendingGoals,
	};
}
