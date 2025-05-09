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

@Injectable()
export class CartoesService {
    constructor(
        @Inject('CARTOES_REPOSITORY')
        private cartoesRepository: Repository<Cartao>,
    ) { }

    async create(data: CreateCartaoDTO): Promise<Cartao> {
        const cartao = this.cartoesRepository.create({
            numeroCriptografado: encrypt(data.numero),
            nomeCriptografado: encrypt(data.nomeTitular),
            validadeCriptografada: encrypt(data.validade),
            cvvCriptografado: encrypt(data.cvv),
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
