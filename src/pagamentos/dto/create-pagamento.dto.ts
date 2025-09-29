export class CreatePagamentoDTO {
  valor: number;
  metodo: 'cartao' ;
  usuarioId: number;
  cartaoId?: number; // opcional, dependendo do método
}
