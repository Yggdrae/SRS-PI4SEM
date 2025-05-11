import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Salas } from 'src/salas/salas.entity';

@Entity()
export class SalasImagens {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Salas)
  sala: Salas;

  @Column({ type: 'bytea' }) // blob no PostgreSQL
  imagem: Buffer;

  @Column()
  nomeArquivo: string;

  @Column()
  tipoMime: string;


  @Column({ nullable: true })
  descricao?: string;
}