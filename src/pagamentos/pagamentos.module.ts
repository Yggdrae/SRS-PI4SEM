import { Module } from '@nestjs/common';
import { PagamentosController } from './pagamentos.controller';
import { PagamentosService } from './pagamentos.service';
import { cartoesProviders } from 'src/cartoes/cartoes.providers';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PagamentosController],
  providers: [...cartoesProviders, PagamentosService],
})
export class PagamentosModule {}
