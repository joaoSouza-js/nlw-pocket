import { api } from "../../services/axios";

type completeGoalProps = {
	id: string;
};

export async function completeGoalController(props: completeGoalProps) {
	const { id } = props;
	await api.post("/goals-completions", {
		goalId: id,
	});
}
