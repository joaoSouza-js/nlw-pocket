import { faker } from "@faker-js/faker";

export function generateGoal() {
	const randomNumber = Math.floor(Math.random() * 8);
	let goal = "";

	switch (randomNumber) {
		case 0:
			goal = `alimentar o ${faker.animal.crocodilia()}`;
			break;
		case 1:
			goal = `viajar com a companhia aérea ${faker.company.name()}`;
			break;
		case 2:
			goal = `tocar a música ${faker.music.songName()}`;
			break;
		case 3:
			goal = `conhecer a pessoa famosa ${faker.person.fullName()}`;
			break;
		case 4:
			goal = `dirigir o veículo ${faker.vehicle.vehicle()}`;
			break;
		case 5:
			goal = `pescar com o ${faker.animal.fish()}`;
			break;
		case 6:
			goal = `assistir ao show de ${faker.music.genre()}`;
			break;
		case 7:
			goal = `pilotar o ${faker.vehicle.vehicle()}`;
			break;
		default:
			goal = "descansar um pouco";
			break;
	}

	return goal;
}
