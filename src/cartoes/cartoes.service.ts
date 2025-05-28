import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cartao } from './cartoes.entity';
import { CreateCartaoDTO } from './dto/create-cartao.dto';
import * as crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'Lorem ipsum dolor sit amet eros.';
const IV_LENGTH = 16;

function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function gerarToken(data: { nome: string; numero: string; cvv: string; validade: string }): string {
    const payload = `${data.nome}|${data.numero}|${data.cvv}|${data.validade}`;
    return encrypt(payload);
}


@Injectable()
export class CartoesService {
    constructor(
        @Inject('CARTOES_REPOSITORY')
        private cartoesRepository: Repository<Cartao>,
    ) { }

    async create(data: CreateCartaoDTO): Promise<Cartao> {
        const ultimosDigitos = data.numero.slice(-4);
        const token = gerarToken({
            nome: data.nomeTitular,
            numero: data.numero,
            cvv: data.cvv,
            validade: data.validade
        });

        const cartao = this.cartoesRepository.create({
            ultimosDigitos: ultimosDigitos,
            validade: data.validade,
            bandeira: data.bandeira,
            token: token,
            usuario: { id: data.usuarioId }
        });

        return await this.cartoesRepository.save(cartao);
    }

    async findByUsuario(usuarioId: number): Promise<Cartao[]> {
        return this.cartoesRepository.find({ where: { usuario: { id: usuarioId } } });
    }

    async delete(id: number): Promise<void> {
        const result = await this.cartoesRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Cartão não encontrado');
    }
}
