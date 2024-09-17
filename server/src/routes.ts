import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateNutritionController } from "./controllers/create-nutrition-controller";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/test", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      '```json\n{\n  "nome": "Rayanne",\n  "sexo": "feminino",\n  "idade": 26,\n  "altura": 165,\n  "peso": 54,\n  "objetivo": "ganhar peso",\n  "refeicoes": [\n    {\n      "horario": "08:00",\n      "nome": "Cafe da Manha",\n      "alimentos": [\n        "2 fatias de pao integral",\n        "1 ovo mexido",\n        "1 banana",\n        "1 copo de leite integral",\n        "1 colher de sopa de azeite de oliva"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da Manha",\n        "alimentos": [\n        "1 iogurte grego com granola",\n        "1 maça"\n      ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoço",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 xícara de arroz integral",\n        "1 xícara de feijão preto",\n        "Salada de folhas verdes com tomate e cenoura",\n        "2 colheres de sopa de azeite de oliva"\n      ]\n    },\n    {\n      "horario": "15:00",\n      "nome": "Lanche da Tarde",\n      "alimentos": [\n        "1 sanduiche natural com peito de peru e queijo",\n        "1 banana"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de peixe assado",\n        "1 xícara de batata doce cozida",\n        "1 xícara de brócolis",\n        "1 colher de sopa de azeite de oliva"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche da Noite",\n      "alimentos": [\n        "1 copo de leite com 1 colher de sopa de mel"\n      ]\n    }\n  ],\n  "suplementos": [\n    "whey protein",\n    "Creatina",\n    "BCAA"\n  ]\n}\n```';

    try {
      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();

      let jsonObject = JSON.parse(jsonString);

      return reply.send({ data: jsonObject });
    } catch (error) {
      throw new Error(error);
    }
  });

  fastify.post(
    "/create-nutrition",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply);
    }
  );
}
