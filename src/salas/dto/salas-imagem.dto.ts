export class SalasImagemDto {
  id: number;
  nomeArquivo: string;
  tipoMime: string;
  imagemBase64: string;
  ordem: number;
  descricao?: string;
}
