import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { usePendingGoals } from "../hook/useGoalsSummary copy";
import { CompleteGoalButton } from "./complete-goal-button";

export function PendingGoals() {
	const { isLoadingPendingGoals, pendingGoals } = usePendingGoals();

	if (isLoadingPendingGoals) return null;

	return (
		<div className="flex flex-wrap gap-3">
			{pendingGoals?.map((pendingGoal) => (
				<CompleteGoalButton key={pendingGoal.id} pendingGoal={pendingGoal} />
			))}
		</div>
	);
}
