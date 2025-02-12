import { Usuario } from "../../domain/entity/Usuario";

export interface UsuarioRepository {
  listarUsuario(): Promise<Usuario[]>;

  criarUsuario(nome: string, email: string, senha: string): Promise<boolean>;

  atualizarUsuario(
    id: number,
    nome: string,
    email: string,
    senha: string
  ): Promise<boolean>;

  excluirUsuario(id: number): Promise<boolean>;
}
