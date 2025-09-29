import { Recursos } from "src/recursos/recursos.entity";
import { Salas } from "src/salas/salas.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SalasRecursos {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Salas, (sala) => sala.id)
    sala: Salas;
    
    @ManyToOne(() => Recursos, (recurso) => recurso.id)
    recurso: Recursos;

    @Column()   
    quantidade: number;
}