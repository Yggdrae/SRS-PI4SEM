import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SalasImagens } from './salasImagens.entity';
import { SalasImagensInterface } from './interfaces/salasImagens.interface';
import { Salas } from 'src/salas/salas.entity';

@Injectable()
export class SalasImagensService {
  constructor(
    @Inject('SALASIMAGENS_REPOSITORY')
    private salasImagensRepository: Repository<SalasImagens>,
    @Inject('SALAS_REPOSITORY')
    private salasRepository: Repository<Salas>,
  ) { }

  async getImagens(): Promise<SalasImagens[]> {
    return await this.salasImagensRepository.find({
      relations: ['sala'],
    });
  }

  async getImagemById(id: number): Promise<SalasImagens> {
    const imagem = await this.salasImagensRepository.findOne({
      where: { id },
      relations: ['sala'],
    });
    if (!imagem) {
      throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
    }
    return imagem;
  }

  async createImagem(data: SalasImagensInterface): Promise<SalasImagens> {
    if (!data || !data.sala || !data.imagem) {
      throw new BadRequestException('Dados obrigatórios (sala e imagem) devem ser informados');
    }

    const salaEntity = await this.salasRepository.findOne({ where: { id: data.sala } });
    if (!salaEntity) {
      throw new BadRequestException(`Sala com ID ${data.sala} não encontrada`);
    }

    const imagem = this.salasImagensRepository.create({
      sala: salaEntity,
      imagem: data.imagem,
      nomeArquivo: data.nomeArquivo,
      tipoMime: data.tipoMime,
    });

    return await this.salasImagensRepository.save(imagem);
  }

  async deleteImagem(id: number): Promise<void> {
    const result = await this.salasImagensRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
    }
  }
}
