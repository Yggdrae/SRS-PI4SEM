import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recursos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
}