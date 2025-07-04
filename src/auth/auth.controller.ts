import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);

    res.cookie('jwt', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      message: 'Login realizado com sucesso',
      usuario: result.usuario,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logout realizado com sucesso' };
  }

  @Get('check')
  async check(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies['jwt'];
    if (!token) {
      return { authenticated: false };
    }

    try {
      const decoded = this.jwtService.verify(token);
      return {
        authenticated: true,
        usuario: {
          id: decoded.sub,
          tipo: decoded.tipo,
        },
      };
    } catch (error) {
      res.clearCookie('jwt');
      return { authenticated: false };
    }
  }
}
