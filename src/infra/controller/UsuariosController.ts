import { ListarUsuariosUseCase } from "../../application/usecase/usuario/ListarUsuariosUseCase";
import { CriarUsuarioUseCase } from "../../application/usecase/usuario/CriarUsuarioUseCase";
import { AtualizarUsuarioUseCase } from "../../application/usecase/usuario/AtualizarUsuarioUseCase";
import { ExcluirUsuarioUseCase } from "../../application/usecase/usuario/ExcluirUsuarioUseCase";
import type { IHttpServer } from "../http/IHttpServer";

export class UsuariosController {

    constructor(
        httpServer: IHttpServer,
        listarUsuariosUsecase: ListarUsuariosUseCase,
        criarUsuarioUsecase: CriarUsuarioUseCase,
        atualizarUsuarioUsecase: AtualizarUsuarioUseCase,
        excluirUsuarioUsecase: ExcluirUsuarioUseCase
    ) {
        httpServer.register('get', '/usuarios', async (params, body) => {
            return await listarUsuariosUsecase.execute();
        });
        httpServer.register('post', '/usuarios', async (params, body) => {
            const { nome, email, senha } = body

            return await criarUsuarioUsecase.execute(nome, email, senha);
        });
        httpServer.register('patch', '/usuarios/:id', async (params, body) => {
            const { id } = params;
            const { nome, email, senha } = body

            return await atualizarUsuarioUsecase.execute(Number(id), nome, email, senha);
        });
        httpServer.register('delete', '/usuarios/:id', async (params, body) => {
            const { id } = params

            return await excluirUsuarioUsecase.execute(Number(id));
        });
    }
}