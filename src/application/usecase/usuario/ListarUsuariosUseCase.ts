import { UsuarioRepository } from "../../repository/IUsuarioRepository";
import { Usuario } from "../../../domain/entity/Usuario";

export class ListarUsuariosUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository
  ) {}

  async execute(): Promise<Usuario[]> {
    return await this.usuarioRepository.listarUsuario();
  }
}
