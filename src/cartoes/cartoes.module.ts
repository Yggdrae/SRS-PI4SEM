import { Module } from '@nestjs/common';
import { CartoesService } from './cartoes.service';
import { CartoesController } from './cartoes.controller';
import { cartoesProviders } from './cartoes.providers';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CartoesController],
  providers: [...cartoesProviders, CartoesService],
})
export class CartoesModule {}