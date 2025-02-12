import { HttpError } from "../../../infra/http/HttpError";
import { UsuarioRepository } from "../../repository/IUsuarioRepository";

export class ExcluirUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async execute(
    id: number
  ): Promise<boolean> {
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

    return await this.usuarioRepository.excluirUsuario(id);
  }
}
