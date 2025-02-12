/* import { IGestaoFuncionarioGateway } from "../../application/gateway/IGestaoFuncionariosGateway";
import { Funcionario } from "../../domain/entity/Funcionario";

export class GestaoFuncionariosGateway implements IGestaoFuncionarioGateway {

    async obterFuncionarioPeloId(id: number): Promise<Funcionario> {
        const request = await fetch(
            `${process.env.URL_GF_CEM}/funcionarios/${id}`
        );
        const { data } = await request.json();

        return new Funcionario(
            data.nome,
            data.codigoFuncionario,
            data.localidadeId
        )
    }
} */