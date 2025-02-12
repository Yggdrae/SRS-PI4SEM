import { UsuarioRepository } from "../../repository/IUsuarioRepository";
import { HttpError } from "../../../infra/http/HttpError";

export class AtualizarUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async execute(id : number, nome: string, email: string, senha: string): Promise<boolean> {
    if(!id)
        throw new HttpError({
                status: 400,
                error: "Bad Request",
                message: "Campo id é obrigatório",
                details: [
                  {
                    field: "id",
                    issue: "Campo id não informado",
                  },
                ],
                timestamp: new Date().toISOString(),
                path: "",
              });

    return await this.usuarioRepository.atualizarUsuario(id, nome, email, senha);
  }
}
