import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/usuarios.entity';

@Entity()
export class Cartao {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.cartoes)
    usuario: Usuario;

    @Column()
    numeroCriptografado: string;

    @Column()
    nomeCriptografado: string;

    @Column()
    validadeCriptografada: string;

    @Column()
    cvvCriptografado: string;

    @Column({ default: false })
    favorito: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    criadoEm: Date;
}
