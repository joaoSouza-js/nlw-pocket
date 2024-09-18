import type { FastifyInstance } from "fastify";
import * as z from "zod";
import { db } from "../db";
import * as schema from "../db/schema";

type createGoalProps = {
	title: string;
	desireWeeklyFrequency: number;
};

export async function createGoal(props: createGoalProps) {
	const { title, desireWeeklyFrequency } = props;
	try {
		const [goalCreated] = await db
			.insert(schema.goals)
			.values({
				name: title,
				desireWeeklyFrequency: desireWeeklyFrequency,
			})
			.returning();
		return {
			goal: goalCreated
		};
	} catch {}
}
