type goalPerDay = {
	id: string;
	title: string;
	completedAt: string;
};

type goalsPerDay = Record<string, goalPerDay[]>;

export interface GOALS_SUMMARY_DTO {
	completed: number;
	total: number;
	goalsPerDay: goalsPerDay;
}
