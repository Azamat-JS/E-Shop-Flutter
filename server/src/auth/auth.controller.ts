import { Controller, Post, Body, Req, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AddressDto, CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import type { AuthenticatedRequest } from 'src/utils/types/types';
import { JwtAuthGuard } from 'src/utils/jwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('tokenIsValid')
  tokenIsValid(@Req() req: AuthenticatedRequest) {
    const token = req.header('x-auth-token');
    if (!token) return false;
    return this.authService.tokenIsValid(token);
  }



  @Post('user-address')
  saveUserAddress(@Body() addressDto: AddressDto, @Req() req: AuthenticatedRequest) {
    const token = req.header('x-auth-token');
    if (!token) return false;
    return this.authService.saveUserAddress(addressDto, token);
  }

  @Get('me')
  getUserData(@Req() req: AuthenticatedRequest) {
    const token = req.header('x-auth-token');
    if (!token) {
      throw new UnauthorizedException("No token provided");
    }
    return this.authService.getUserData(token);

  }

  @UseGuards(JwtAuthGuard)
  @Get('imagekit')
  getAuthParams() {
    return this.authService.getAuthParams()
  }
}
