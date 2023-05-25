import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return {
      User: req.user,
      message: 'Logged in successfully',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @Get('/logout')
  async logout(@Req() req) {
    req.session.destroy();
    return {
      message: 'Logged out successfully',
    };
  }
}
