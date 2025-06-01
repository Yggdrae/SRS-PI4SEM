import { SalasImagemDto } from './salas-imagem.dto';
import { SalaRecursoDto } from './sala-recurso.dto';
import { DisponibilidadeSalaDto } from './disponibilidade-sala.dto';

export class SalaDto {
  id: number;
  numero: number;
  andar: number;
  endereco?: string;
  capacidade?: number;
  valorHora: number;
  isDestaque: boolean;
  salasImagens: SalasImagemDto[];
  salasRecursos: SalaRecursoDto[];
  disponibilidades: DisponibilidadeSalaDto[];
}
