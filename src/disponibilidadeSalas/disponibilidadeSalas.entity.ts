import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Salas } from 'src/salas/salas.entity';

@Entity()
export class DisponibilidadeSalas {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Salas, sala => sala.disponibilidades, { onDelete: 'CASCADE' })
  sala: Salas;

  // 1 = Domingo, 2 = Segunda, ..., 7 = Sábado
  @Column({ type: 'int' })
  diaDaSemana: number;

  @Column({ type: 'time' })
  horarioInicio: string;

  @Column({ type: 'time' })
  horarioFim: string;
}
