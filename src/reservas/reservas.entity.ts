import { Salas } from "src/salas/salas.entity";
import { Usuario } from "src/usuarios/usuarios.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Reservas {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, usuario => usuario.reservas)
    usuario: Usuario;

    @ManyToOne(() => Salas, sala => sala.reservas)
    sala: Salas;

    @Column()
    diaHoraInicio: Date;

    @Column()
    diaHoraFim: Date;

    @Column()
    status: string;

    @Column({ nullable: true })
    motivoCancelamento: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valorHoraNaReserva: number;

}
