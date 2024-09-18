import { count, gte, lte, and, eq } from "drizzle-orm";
import { db } from "../db";
import { goals, goalsCompletions } from "../db/schema";
import dayjs from "dayjs";
import { sql } from "drizzle-orm";
import { BadRequest } from "./_erros/badRequest";

type createGoalCompletionProps = {
	goalId: string;
};

export async function createGoalCompletion({
	goalId,
}: createGoalCompletionProps) {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalCompletionCount = db.$with("goals_completion_count").as(
		db
			.select({
				goalId: goalsCompletions.goalId,
				completionCount: count(goalsCompletions.id).as("completionCount"),
			})
			.from(goalsCompletions)
			.where(
				and(
					gte(goalsCompletions.createdAt, firstDayOfWeek),
					lte(goalsCompletions.createdAt, lastDayOfWeek),
				),
			)
			.groupBy(goalsCompletions.goalId),
	);

	const [goalInformation] = await db
		.with(goalCompletionCount)
		.select({
			title: goals.name,
			desireWeeklyFrequency: goals.desireWeeklyFrequency,
			completionCount: sql`
			COALESCE(${goalCompletionCount.completionCount},0)
		`.mapWith(Number),
		})
		.from(goals)
		.leftJoin(goalCompletionCount, eq(goalCompletionCount.goalId, goals.id))
		.where(eq(goals.id, goalId));

	if (
		goalInformation.completionCount >= goalInformation.desireWeeklyFrequency
	) {
		throw new BadRequest("Está meta ja alcançou o se limite nesta semana");
	}

	const insertResult = await db.insert(goalsCompletions).values({
		goalId: goalId,
	});

	return {
		goalCompletion: goalInformation,
	};
}
