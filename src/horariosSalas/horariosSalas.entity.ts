import { Reservas } from "src/reservas/reservas.entity";
import { Salas } from "src/salas/salas.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HorariosSalas {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Reservas, reserva => reserva.horario)
    reservas: Reservas[];

    @ManyToOne(() => Salas, (sala) => sala.id)
    sala: Salas;
    
    @Column()
    diaHoraInicio: Date;

    @Column()
    diaHoraFim: Date;
}