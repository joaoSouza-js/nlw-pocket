import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";
import type { GOALS_SUMMARY_DTO } from "../DTO/GOALS_SUMMARY_DTO";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBR);

type summaryProps = {
	goalsSummary: GOALS_SUMMARY_DTO;
};

function showOnlyDay(date: string | Date) {
	const day = dayjs(date).format("dddd");
	return day;
}

function showDateTime(date: string | Date) {
	const dateTime = dayjs(date).format("HH[:]mm");
	return dateTime;
}

function showDayAndMonth(date: string | Date) {
	const dayAndMonth = dayjs(date).format("D [de] MMMM");
	return dayAndMonth;
}

export function Summary(props: summaryProps) {
	const { goalsSummary } = props;
	const totalGoals = goalsSummary.total;
	const completedGoals = goalsSummary.completed;

	const goalsProgress = (completedGoals / totalGoals) * 100;
	const goalsProgressFormatted = Math.round(goalsProgress);

	const firstDayOfWeek = dayjs().startOf("week").format("D MMM");
	const endDayOfWeek = dayjs().endOf("week").format("D MMM");

	const daysOfWeekFormatted = Object.entries(goalsSummary.goalsPerDay).map(
		(dayPerWeekObject) => {
			const [day, dayGoals] = dayPerWeekObject;
			return {
				day: day,
				goals: dayGoals,
			};
		},
	);
	return (
		<div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<InOrbitIcon />
					<span className="text-lg font-semibold">
						{firstDayOfWeek} - {endDayOfWeek}
					</span>
				</div>

				<DialogTrigger asChild>
					<Button size="sm">
						<Plus className="size-4" />
						Cadastrar meta
					</Button>
				</DialogTrigger>
			</div>

			<div className="flex flex-col gap-3">
				<Progress value={completedGoals} max={totalGoals}>
					<ProgressIndicator style={{ width: `${goalsProgressFormatted}%` }} />
				</Progress>

				<div className="flex items-center justify-between text-xs text-zinc-400">
					<span>
						Você completou{" "}
						<span className="text-zinc-100">{completedGoals}</span> de{" "}
						<span className="text-zinc-100">{totalGoals}</span> metas nessa
						semana.
					</span>
					<span>{goalsProgressFormatted}%</span>
				</div>
			</div>

			<Separator />

			<PendingGoals />

			<div className="flex flex-col gap-6">
				<h2 className="text-xl font-medium">Sua semana</h2>

				{daysOfWeekFormatted.map((dayOfWeek) => (
					<div key={dayOfWeek.day} className="flex flex-col gap-4">
						<h3 className="font-medium">
							{showOnlyDay(dayOfWeek.day)}
							<span className="text-zinc-400 text-xs">
								{" "}
								( {showDayAndMonth(dayOfWeek.day)} )
							</span>
						</h3>

						<ul className="flex flex-col gap-3">
							{dayOfWeek.goals.map((goal) => (
								<li key={goal.id} className="flex items-center gap-2">
									<CheckCircle2 className="size-4 text-pink-500" />
									<span className="text-sm text-zinc-400">
										Você completou "
										<span className="text-zinc-100">{goal.title}</span>" às{" "}
										<span className="text-zinc-100">
											{showDateTime(goal.completedAt)}h
										</span>
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
