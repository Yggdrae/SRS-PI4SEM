import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Salas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  andar: number;
}
