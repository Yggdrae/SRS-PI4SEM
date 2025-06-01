import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Salas } from "./salas.entity";
import { SalasInterface } from "./interfaces/salas.interface";
import { SalasImagemDto } from "./dto/salas-imagem.dto";
import { SalaDto } from "./dto/sala.dto";

@Injectable()
export class SalasService {
    constructor(
        @Inject('SALAS_REPOSITORY')
        private salasRepository: Repository<Salas>
    ) { }

    private toDto(sala: Salas): SalaDto {
        return {
            id: sala.id,
            numero: sala.numero,
            andar: sala.andar,
            endereco: sala.endereco,
            capacidade: sala.capacidade,
            valorHora: sala.valorHora,
            isDestaque: sala.isDestaque,
            salasImagens: sala.salasImagens?.map(img => ({
                id: img.id,
                nomeArquivo: img.nomeArquivo,
                tipoMime: img.tipoMime,
                imagemBase64: `data:${img.tipoMime};base64,${img.imagem.toString('base64')}`,
                ordem: img.ordem,
                descricao: img.descricao,
            })).sort((a, b) => a.ordem - b.ordem) || [],
            salasRecursos: sala.salasRecursos?.map(r => ({
                id: r.id,
                quantidade: r.quantidade,
                recurso: {
                    id: r.recurso.id,
                    nome: r.recurso.nome,
                },
            })) || [],
            disponibilidades: sala.disponibilidades?.map(d => ({
                id: d.id,
                diaDaSemana: d.diaDaSemana,
                horarioInicio: d.horarioInicio,
                horarioFim: d.horarioFim,
            })) || [],
        };
    }


    async getSalas(): Promise<Salas[]> {
        return await this.salasRepository.find();
    }

    async getSalasFull(): Promise<SalaDto[]> {
        const salas = await this.salasRepository.find({ relations: ['salasRecursos', 'salasRecursos.recurso', 'salasImagens', 'disponibilidades'] });
        return salas.map(this.toDto);
    }

    async createSalas(data: SalasInterface): Promise<Salas> {
        if (!data.numero || !data.andar || data.valorHora === undefined) {
            throw new BadRequestException('Dados obrigatórios (número, andar, valorHora) não fornecidos');
        }
        const sala = this.salasRepository.create(data);
        return await this.salasRepository.save(sala);

    }

    async updateSalas(id: number, data: Partial<SalasInterface>): Promise<Salas> {
        const sala = await this.salasRepository.findOne({ where: { id } });
        if (!sala) {
            throw new NotFoundException(`Sala com ID ${id} não encontrada`);
        }

        if (!data || Object.keys(data).length === 0) {
            throw new BadRequestException('Dados para atualização não informados')
        }

        Object.assign(sala, data);
        return await this.salasRepository.save(sala);
    }

    async deleteSalas(id: number): Promise<void> {
        const result = await this.salasRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Sala com ID ${id} não encontrada para exclusão`);
        }
    }

    async getSalaById(id: number): Promise<Salas> {
        const sala = await this.salasRepository.findOne({ where: { id } });
        if (!sala) {
            throw new NotFoundException(`Sala com ID ${id} não encontrada`);
        }
        return sala;
    }

    async getSalaFullById(id: number): Promise<SalaDto> {
        try {
            const sala = await this.salasRepository.findOne({ where: { id }, relations: ['salasRecursos', 'salasRecursos.recurso', 'salasImagens'] });
            if (!sala) {
                throw new NotFoundException(`Sala com ID ${id} não encontrada`);
            }
            return this.toDto(sala);
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getSalasDestaque(): Promise<SalaDto[]> {
        const salas = await this.salasRepository.find({
            where: { isDestaque: true },
            relations: ['salasRecursos', 'salasRecursos.recurso', 'salasImagens'],
        });
        return salas.map(this.toDto);
    }

}
