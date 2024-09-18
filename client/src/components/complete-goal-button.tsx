import { Plus } from "lucide-react";
import type { PENDING_GOAL_DTO } from "../DTO/PENDING_GOAL_DTO";
import { OutlineButton } from "./ui/outline-button";
import { useEffect, useState } from "react";
import { completeGoalController } from "../http/goals/complete-goal";
type completeGoalButton = {
	pendingGoal: PENDING_GOAL_DTO;
};

export function CompleteGoalButton(props: completeGoalButton) {
	const { pendingGoal } = props;
	const [completedGoalsCount, setCompletedGoalsAccount] = useState(
		pendingGoal.completionCount,
	);
	const [isCompletedGoalsRequest, setIsCompletedGoalsRequest] = useState(false);
	const completedGoalsIsDisable =
		isCompletedGoalsRequest ||
		completedGoalsCount >= pendingGoal.desireWeeklyFrequency;

	async function handleCompleteGoal() {
		if (isCompletedGoalsRequest) return;
		setIsCompletedGoalsRequest(true);
		try {
			await completeGoalController({
				id: pendingGoal.id,
			});
			window.alert("conclui");
			setCompletedGoalsAccount((state) => state + 1);
		} catch (error) {
			window.alert(error);
		} finally {
			setIsCompletedGoalsRequest(false);
		}
	}

	return (
		<OutlineButton
			disabled={completedGoalsIsDisable}
			onClick={handleCompleteGoal}
		>
			<Plus className="size-4 text-zinc-600" />
			{pendingGoal.title}
		</OutlineButton>
	);
}
