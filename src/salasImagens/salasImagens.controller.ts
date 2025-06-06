import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SalasImagensService } from './salasImagens.service';
import { SalasImagensInterface } from './interfaces/salasImagens.interface';
import { SalasImagens } from './salasImagens.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { SalasImagensDto } from './dto/salasImagens.dto';

@Controller('salas_imagens')
export class SalasImagensController {
  constructor(private readonly salasImagensService: SalasImagensService) { }

  @Get()
  getImagens(): Promise<SalasImagensDto[]> {
    return this.salasImagensService.getImagens();
  }

  @Get(':id')
  getImagemById(@Param('id', ParseIntPipe) id: number): Promise<SalasImagensDto> {
    return this.salasImagensService.getImagemById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagem')) // permite receber arquivos
  async createImagem(
    @UploadedFile() file: any,
    @Body('salaId') salaId: string,
    @Body('ordem') ordem: string,
  ): Promise<SalasImagens> {
    if (!file || !salaId) {
      throw new BadRequestException('Dados obrigatórios (sala e imagem) devem ser informados');
    }

    return this.salasImagensService.createImagem({
      sala: parseInt(salaId),
      imagem: file.buffer,
      nomeArquivo: file.originalname,
      tipoMime: file.mimetype,
      ordem: parseInt(ordem),
    });
  }

  @Delete(':id')
  deleteImagem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.salasImagensService.deleteImagem(id);
  }

  @Post('reorganizar')
  async reorganizarById(
    @Body('salaId', ParseIntPipe) salaId: number,
    @Body('ids') ids: number[],
  ): Promise<void> {
    return this.salasImagensService.reorganizarById(salaId, ids);
  }
}
