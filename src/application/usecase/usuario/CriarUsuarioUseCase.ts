import { HttpError } from "../../../infra/http/HttpError";
import { UsuarioRepository } from "../../repository/IUsuarioRepository";
import formatarData from "../../../utils/FormatarData";

export class CriarUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async execute(
    nome: string,
    email: string,
    senha: string,
  ): Promise<boolean> {
    const camposObrigatorios = [
      { campo: "nome", valor: nome },
      { campo: "email", valor: email },
      { campo: "senha", valor: senha }
    ];
    const camposVazios = camposObrigatorios.filter((campo) => !campo.valor);

    if (camposVazios.length > 0)
      throw new HttpError({
        status: 400,
        error: "Bad Request",
        message: `Campo(s) ${camposVazios.join(", ")} não informado(s)`,
        details: camposVazios.map((campo) => ({
          field: campo.campo,
          issue: `Campo ${campo.campo} é obrigatório`,
        })),
        timestamp: new Date().toISOString(),
        path: "",
      });

    return await this.usuarioRepository.criarUsuario(nome, email, senha);
  }
}
