import { EmptyGoals } from "./components/empty-goals";
import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
import { useGoalsSummary } from "./hook/usePendingGoals";
import { Loader } from "./components/ui/loader";
export function App() {
	const { goalsSummary, isLoadingGoalsSummary } = useGoalsSummary();

	if (isLoadingGoalsSummary === true) {
		return <Loader />;
	}
	return (
		<div className="max-w-screen-xl mx-auto  flex  justify-center  ">
			<Dialog>
				{goalsSummary?.total && goalsSummary.total > 0 && (
					<Summary goalsSummary={goalsSummary} />
				)}
				{goalsSummary?.total && goalsSummary.total <= 0 && <EmptyGoals />}
				<CreateGoal />
			</Dialog>
		</div>
	);
}
