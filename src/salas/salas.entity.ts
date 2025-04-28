import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Salas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  andar: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valorHora: number;

  @Column({ default: false })
  isDestaque: boolean;

}
