import { DisponibilidadeSalas } from 'src/disponibilidadeSalas/disponibilidadeSalas.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservas } from 'src/reservas/reservas.entity';
import { SalasRecursos } from 'src/salasRecursos/salasRecursos.entity';
import { SalasImagens } from 'src/salasImagens/salasImagens.entity';

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

  @OneToMany(() => SalasRecursos, salasRecursos => salasRecursos.sala)
  salasRecursos: SalasRecursos[];

  @OneToMany(() => SalasImagens, salasImagens => salasImagens.sala)
  salasImagens: SalasImagens[];


  @Column('decimal', { precision: 10, scale: 2 })
  valorHora: number;

  @Column({ default: false })
  isDestaque: boolean;

  @OneToMany(() => DisponibilidadeSalas, disponibilidade => disponibilidade.sala)
  disponibilidades: DisponibilidadeSalas[];


}
