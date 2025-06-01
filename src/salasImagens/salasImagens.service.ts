import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SalasImagens } from './salasImagens.entity';
import { SalasImagensInterface } from './interfaces/salasImagens.interface';
import { Salas } from 'src/salas/salas.entity';
import { SalasImagensDto } from './dto/salasImagens.dto';

@Injectable()
export class SalasImagensService {
  constructor(
    @Inject('SALASIMAGENS_REPOSITORY')
    private salasImagensRepository: Repository<SalasImagens>,
    @Inject('SALAS_REPOSITORY')
    private salasRepository: Repository<Salas>,
  ) { }

  private toDto(entity: SalasImagens): SalasImagensDto {
    return {
      id: entity.id,
      salaId: entity.sala.id,
      nomeArquivo: entity.nomeArquivo,
      tipoMime: entity.tipoMime,
      imagemBase64: `data:${entity.tipoMime};base64,${entity.imagem.toString('base64')}`,
    }
  }

  async getImagens(): Promise<SalasImagensDto[]> {
    const imagens = await this.salasImagensRepository.find({
      relations: ['sala'],
    });
    return imagens.map(this.toDto);
  }

  async getImagemById(id: number): Promise<SalasImagensDto> {
    const imagem = await this.salasImagensRepository.findOne({
      where: { id },
      relations: ['sala'],
    });
    if (!imagem) {
      throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
    }
    return this.toDto(imagem);
  }

  async createImagem(data: SalasImagensInterface): Promise<SalasImagens> {
    if (!data || !data.sala || !data.imagem) {
      throw new BadRequestException('Dados obrigatórios (sala e imagem) devem ser informados');
    }

    const salaEntity = await this.salasRepository.findOne({ where: { id: data.sala } });
    if (!salaEntity) {
      throw new BadRequestException(`Sala com ID ${data.sala} não encontrada`);
    }

    const imagensExistentes = await this.salasImagensRepository.count({
      where: { sala: { id: data.sala } },
    });

    const imagem = this.salasImagensRepository.create({
      sala: salaEntity,
      imagem: data.imagem,
      nomeArquivo: data.nomeArquivo,
      tipoMime: data.tipoMime,
      ordem: imagensExistentes + 1,
    });

    return await this.salasImagensRepository.save(imagem);
  }


  async deleteImagem(id: number): Promise<void> {
    const result = await this.salasImagensRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
    }
  }

  async reorganizarById(salaId: number, ids: number[]): Promise<void> {
    if (!salaId || !Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException('Sala e lista de IDs devem ser informadas.');
    }

    // Busca todas imagens da sala
    const imagensDaSala = await this.salasImagensRepository.find({
      where: { sala: { id: salaId } },
    });

    const idsDaSala = imagensDaSala.map(img => img.id);
    const todosPertencem = ids.every(id => idsDaSala.includes(id));

    if (!todosPertencem) {
      throw new BadRequestException('Todos os IDs devem pertencer à sala informada.');
    }

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      await this.salasImagensRepository.update({ id }, { ordem: i + 1 });
    }
  }
}
