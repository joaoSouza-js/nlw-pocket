import { faker } from "@faker-js/faker";
import { db, pgClient } from ".";
import * as schema from "./schema";
import { generateGoal } from "../utils/generateGoal";

type markGoalsAsFinishedProps = {
	id: string;
	createdAt: string | Date;
}[];

async function generateGoals(goalsAmount = 1) {
	const goals = Array.from(
		{
			length: goalsAmount,
		},
		() => {
			const goal = {
				desireWeeklyFrequency: faker.number.int({ min: 1, max: 6 }),
				name: generateGoal(),
				createdAt: faker.date.soon({
					days: 7,
					refDate: new Date(),
				}),
			};

			return goal;
		},
	);

	const goalsResponse = await db.insert(schema.goals).values(goals).returning();

	return goalsResponse;
}

async function markGoalsAsFinished(goals: markGoalsAsFinishedProps) {
	const goalIdFormatted = goals.map((goal) => {
		return {
			goalId: goal.id,
			createdAt: faker.date.soon({
				days: 4,
				refDate: goal.createdAt,
			}),
		};
	});
	const goalsFormattedHalf = goalIdFormatted.slice(
		0,
		Math.floor(goalIdFormatted.length / 2),
	);

	await db.insert(schema.goalsCompletions).values(goalsFormattedHalf);
}

async function seed() {
	await db.delete(schema.goalsCompletions);
	await db.delete(schema.goals);

	const goals = await generateGoals(10);

	await markGoalsAsFinished(goals);
}

seed().finally(() => {
	pgClient.end();
});
