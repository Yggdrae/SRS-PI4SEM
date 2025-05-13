import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { SalasImagensController } from './salasImagens.controller';
import { SalasImagensService } from './salasImagens.service';
import { salasImagensProviders } from './salasImagens.providers';


@Module({
  imports: [DatabaseModule],
  controllers: [SalasImagensController],
  providers: [...salasImagensProviders, SalasImagensService],
})
export class SalasImagensModule {}
