import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Salas } from 'src/salas/salas.entity';

@Entity()
export class ExcecoesDisponibilidade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Salas, sala => sala.id, { onDelete: 'CASCADE' })
  sala: Salas;

  @Column({ type: 'date' })
  data: string;

  @Column({ type: 'boolean', default: true })
  indisponivel: boolean;

  @Column({ nullable: true })
  motivo: string;

  @Column({ type: 'time', nullable: true })
  horarioInicio: string;

  @Column({ type: 'time', nullable: true })
  horarioFim: string;
}
