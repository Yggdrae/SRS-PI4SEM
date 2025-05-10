import { Controller, Post, Body } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDTO } from './dto/create-pagamento.dto';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post()
  async pagar(@Body() dto: CreatePagamentoDTO) {
    const resultado = await this.pagamentosService.processarPagamento(dto);
    return resultado;
  }
}