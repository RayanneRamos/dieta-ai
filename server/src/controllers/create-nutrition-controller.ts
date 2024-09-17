import { FastifyReply, FastifyRequest } from "fastify";
import { CreateNutritionService } from "../services/create-nutrition-service";

interface CreateNutritionControllerProps {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  objective: string;
  level: string;
}

export class CreateNutritionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, weight, height, age, gender, objective, level } =
      request.body as CreateNutritionControllerProps;

    const createNutrition = new CreateNutritionService();
    const nutrition = await createNutrition.execute({
      name,
      weight,
      height,
      age,
      gender,
      objective,
      level,
    });

    reply.send(nutrition);
  }
}
