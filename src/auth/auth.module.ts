import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usuariosProviders } from '../usuarios/usuarios.providers';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [...usuariosProviders, AuthService],
})
export class AuthModule {}
