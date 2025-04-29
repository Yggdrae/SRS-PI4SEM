import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SalasImagens } from './salasImagens.entity';
import { SalasImagensInterface } from './interfaces/salasImagens.interface';

@Injectable()
export class SalasImagensService {
  constructor(
    @Inject('SALASIMAGENS_REPOSITORY')
    private salasImagensRepository: Repository<SalasImagens>,
  ) { }

  async getImagens(): Promise<SalasImagens[]> {
    return await this.salasImagensRepository.find();
  }

  async getImagemById(id: number): Promise<SalasImagens> {
    const imagem = await this.salasImagensRepository.findOne({ where: { id } });
    if (!imagem) {
      throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
    }
    return imagem;
  }

  async createImagem(data: SalasImagensInterface): Promise<SalasImagens> {
    if (!data || !data.sala || !data.imagem) {
      throw new BadRequestException('Dados obrigatórios (sala e imagem) devem ser informados');
    }

    const imagem = this.salasImagensRepository.create(data);
    return await this.salasImagensRepository.save(imagem);
  }

  async deleteImagem(id: number): Promise<void> {
    const result = await this.salasImagensRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
    }
  }
}
