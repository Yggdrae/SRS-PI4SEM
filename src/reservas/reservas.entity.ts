import { HorariosSalas } from "src/horariosSalas/horariosSalas.entity";
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

    @ManyToOne(() => HorariosSalas, horario => horario.reservas)
    horario: HorariosSalas;
    
    @Column()
    status: string;

    @Column({ nullable: true })
    motivoCancelamento: string;
}
