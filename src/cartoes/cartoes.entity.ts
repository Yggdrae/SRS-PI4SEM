import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Usuario } from 'src/usuarios/usuarios.entity';

@Entity()
export class Cartao {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.cartoes)
    usuario: Usuario;

    @Column()
    ultimosDigitos: string;

    @Column()
    validade: string;

    @Column()
    bandeira: string;

    @Column({ unique: true })
    token: string;

    @Column({ default: false })
    favorito: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    criadoEm: Date;
}
