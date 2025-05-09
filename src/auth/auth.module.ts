import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usuariosProviders } from '../usuarios/usuarios.providers';
import { DatabaseModule } from 'src/db/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET || 'EcksDee', // use env em produção
    signOptions: { expiresIn: '1h' },
  }),DatabaseModule],
  controllers: [AuthController],
  providers: [...usuariosProviders, AuthService],
})
export class AuthModule {}
