import { DisponibilidadeSalas } from 'src/disponibilidadeSalas/disponibilidadeSalas.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservas } from 'src/reservas/reservas.entity';

@Entity()
export class Salas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  endereco: string;

  @OneToMany(() => Reservas, reserva => reserva.sala)
  reservas: Reservas[];

  @Column()
  numero: number;

  @Column()
  andar: number;

  @Column({ nullable: true })
  capacidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valorHora: number;

  @Column({ default: false })
  isDestaque: boolean;

  @OneToMany(() => DisponibilidadeSalas, disponibilidade => disponibilidade.sala)
  disponibilidades: DisponibilidadeSalas[];


}
