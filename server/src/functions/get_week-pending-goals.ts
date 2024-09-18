import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { goals, goalsCompletions } from "../db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";

dayjs.extend(weekOfYear);

export async function getWeekPendingGoals() {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
		db
			.select({
				id: goals.id,
				title: goals.name,
				desireWeeklyFrequency: goals.desireWeeklyFrequency,
				createdAt: goals.createdAt,
			})
			.from(goals)
			.where(lte(goals.createdAt, lastDayOfWeek)),
	);

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

	const pendingGoals = await db
		.with(goalsCreatedUpToWeek, goalCompletionCount)
		.select({
			id: goalsCreatedUpToWeek.id,
			title: goalsCreatedUpToWeek.title,
			desireWeeklyFrequency: goalsCreatedUpToWeek.desireWeeklyFrequency,
			completionCount: sql`
                COALESCE(${goalCompletionCount.completionCount},0)
            `.mapWith(Number),
		})
		.from(goalsCreatedUpToWeek)
		.leftJoin(
			goalCompletionCount,
			eq(goalCompletionCount.goalId, goalsCreatedUpToWeek.id),
		);

	return {
		pendingGoals,
	};
}
