import { Salas } from "src/salas/salas.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HorariosSalas {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Salas, (sala) => sala.id)
    sala: number;

    @Column()
    diaHoraInicio: Date;

    @Column()
    diaHoraFim: Date;
}