import type { IHttpServer } from "../http/IHttpServer";

export class ReservasController {

    constructor(
        httpServer: IHttpServer,
    ) {
        httpServer.register('get', '/reservas', async (params, body) => {
            return "reservas";
        });
        httpServer.register('post', '/reservas', async (params, body) => {
            const { usuario_id, sala_id, dia_hora_inicio, dia_hora_fim, status } = body

            return "registered reserva";
        });
        httpServer.register('patch', '/reservas/:id', async (params, body) => {
            const { id } = params;
            const { status, motivo_cancelamento } = body;

            return "patched reserva";
        });
    }
}