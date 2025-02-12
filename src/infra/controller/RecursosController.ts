import type { IHttpServer } from "../http/IHttpServer";

export class RecursosController {

    constructor(
        httpServer: IHttpServer,
    ) {
        httpServer.register('get', '/recursos', async (params, body) => {
            return "recursos";
        });
        httpServer.register('post', '/recursos', async (params, body) => {
            const { sala_id, recurso_id, quantidade } = body;

            return "registered recurso";
        });
        httpServer.register('patch', '/recursos/:id', async (params, body) => {
            const { id } = params;

            return "patched recurso";
        });
        httpServer.register('delete', '/recursos/:id', async (params, body) => {
            const { id } = params;

            return "deleted recurso";
        });
    }
}