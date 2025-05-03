import { HorariosSalas } from "src/horariosSalas/horariosSalas.entity";
import { Salas } from "src/salas/salas.entity";
import { Usuario } from "src/usuarios/usuarios.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservas {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario , (usuario) => usuario.id)
    usuario: number;

    @ManyToOne(() => Salas, (sala) => sala.id)
    sala: number;

    @ManyToOne(() => HorariosSalas)
    horario: HorariosSalas;

    @Column()
    status: string;

    @Column()
    motivoCancelamento: string;
}
