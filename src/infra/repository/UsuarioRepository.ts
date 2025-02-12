import { UsuarioRepository } from "../../application/repository/IUsuarioRepository";
import { PrismaClient } from "@prisma/client";
import { HttpError } from "../http/HttpError";
import { Usuario } from "../../domain/entity/Usuario";

const prisma = new PrismaClient();

export class PrismaUsuarioRepository implements UsuarioRepository {
  async listarUsuario(): Promise<Usuario[]> {
    const usuarios = await prisma.usuarios.findMany();

    if (usuarios.length === 0)
      throw new HttpError({
        status: 404,
        error: "Not Found",
        message: "Nenhum usuario encontrado",
        details: [
          {
            field: "usuarios",
            issue: "Nenhum usuario encontrado",
          }
        ],
        timestamp: new Date().toISOString(),
        path: "/usuarios",
      });

    return usuarios.map((usuario) => {
      return new Usuario(
        usuario.id,
        usuario.nome,
        usuario.email,
        usuario.senha,
        usuario.criado_em
      );
    });
  }

  async criarUsuario(
    nome: string,
    email: string,
    senha: string
  ): Promise<boolean> {
    return Boolean(
      await prisma.usuarios.create({
        data: {
          nome: nome,
          email: email,
          senha: senha,
          criado_em: new Date(),
        },
      })
    );
  }

  async atualizarUsuario(id: number, nome: string, email: string, senha: string): Promise<boolean> {
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: {
        id: id,
      },
    })

    if (!usuarioExistente)
      throw new HttpError({
        status: 404,
        error: "Not Found",
        message: "Nenhum usuario encontrado",
        details: [
          {
            field: "usuarios",
            issue: "Nenhum usuario encontrado",
          }
        ],
        timestamp: new Date().toISOString(),
        path: "/usuarios",
      });

    return Boolean(
      await prisma.usuarios.update({
        where: {
          id: id,
        },
        data: {
          nome: nome ? nome : usuarioExistente.nome,
          email: email ? email : usuarioExistente.email,
          senha: senha ? senha : usuarioExistente.senha,
        }
      })
    )
  }

  async excluirUsuario(id: number): Promise<boolean> {
    return Boolean(
      await prisma.usuarios.delete({
        where: {
          id: id,
        },
      })
    );
  }
}
