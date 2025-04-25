import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SalasImagensService } from './salasImagens.service';
import { SalasImagensInterface } from './interfaces/salasImagens.interface';
import { SalasImagens } from './salasImagens.entity';

@Controller('salas_imagens')
export class SalasImagensController {
  constructor(private readonly salasImagensService: SalasImagensService) {}

  @Get()
  getImagens(): Promise<SalasImagens[]> {
    return this.salasImagensService.getImagens();
  }

  @Get(':id')
  getImagemById(@Param('id', ParseIntPipe) id: number): Promise<SalasImagens> {
    return this.salasImagensService.getImagemById(id);
  }

  @Post()
  createImagem(@Body() data: SalasImagensInterface): Promise<SalasImagens> {
    return this.salasImagensService.createImagem(data);
  }

  @Delete(':id')
  deleteImagem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.salasImagensService.deleteImagem(id);
  }
}
