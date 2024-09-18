import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { BadRequest } from "../functions/_erros/badRequest";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
	const isValidationError = error instanceof ZodError;

	if (isValidationError) {
		return reply.status(400).send({
			message: "Error durring validation",
			error: error.flatten().fieldErrors,
		});
	}

	const isBadRequestError = error instanceof BadRequest;

	if (isBadRequestError) {
		reply.status(400).send({
			message: error.message,
		});
	}
	return reply.status(500).send({ message: "Internal server error" });
};
