import { CriarUsuarioUseCase } from "./application/usecase/usuario/CriarUsuarioUseCase";
import { ReservasController } from "./infra/controller/ReservasController";
//import { GestaoFuncionariosGateway } from "./infra/gateway/GestaoFuncionariosGateway";
import { PrismaUsuarioRepository } from "./infra/repository/UsuarioRepository";
import { UsuariosController } from "./infra/controller/UsuariosController";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import "dotenv/config";
import { ListarUsuariosUseCase } from "./application/usecase/usuario/ListarUsuariosUseCase";
import { AtualizarUsuarioUseCase } from "./application/usecase/usuario/AtualizarUsuarioUseCase";
import { ExcluirUsuarioUseCase } from "./application/usecase/usuario/ExcluirUsuarioUseCase";

const httpServer = new ExpressAdapter();
const solicitacaoRepository = new PrismaUsuarioRepository();
//const gestaoFuncionariosGateway = new GestaoFuncionariosGateway();

new ReservasController(
  httpServer
);

new UsuariosController(
  httpServer,
  new ListarUsuariosUseCase(solicitacaoRepository),
  new CriarUsuarioUseCase(solicitacaoRepository),
  new AtualizarUsuarioUseCase(solicitacaoRepository),
  new ExcluirUsuarioUseCase(solicitacaoRepository)
);

httpServer.listen(Number(process.env.SERVER_PORT));
