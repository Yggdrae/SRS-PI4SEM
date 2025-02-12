import type { IHttpServer } from "../http/IHttpServer";

export class SalasController {
  constructor(httpServer: IHttpServer) {
    //Salas
    httpServer.register("get", "/salas", async (params, body) => {
      return "salas"
    });
    httpServer.register("post", "/salas", async (params, body) => {
      const { numero, andar } = body;

      return "registered sala";
    });
    httpServer.register("patch", "/salas/:id", async (params, body) => {
      const { id } = params;
      const { numero, andar } = body;

      return "patched sala";
    });
    httpServer.register("delete", "/salas/:id", async (params, body) => {
      const { id } = params;

      return "deleted sala";
    });

    //Horarios Salas
    httpServer.register("get", "/horarios-salas", async (params, body) => {
      return "horarios salas"
    });
    httpServer.register("post", "/horarios-salas", async (params, body) => {
      const { sala_id, dia_hora_inicio, dia_hora_fim } = body;

      return "registered horario sala";
    });
    httpServer.register("patch", "/horarios-salas/:id", async (params, body) => {
      const { sala_id, dia_hora_inicio, dia_hora_fim } = body;

      return "patched horario sala";
    });
    httpServer.register("delete", "/horarios-salas/:id", async (params, body) => {
      const { id } = params;

      return "patched horario sala";
    });

    //Recursos Salas
    httpServer.register("get", "/recursos-salas", async (params, body) => {
      return "recursos salas"
    });
    httpServer.register("post", "/recursos-salas", async (params, body) => {
      const { sala_id, dia_hora_inicio, dia_hora_fim } = body;

      return "registered recurso sala";
    });
    httpServer.register("patch", "/recursos-salas/:id", async (params, body) => {
      const { sala_id, dia_hora_inicio, dia_hora_fim } = body;

      return "patched recurso sala";
    });
    httpServer.register("delete", "/recursos-salas/:id", async (params, body) => {
      const { id } = params;

      return "patched recurso sala";
    });
  }
}
