import fastify from "fastify";
import cors from "@fastify/cors";
import { errorHandler } from "../utils/erros-handler";

import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { routes } from "./routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(cors, {
	origin: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);
app.register(routes);

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("i running on http://localhost:3333");
	})
	.catch((error) => {
		console.error(error);
	});
