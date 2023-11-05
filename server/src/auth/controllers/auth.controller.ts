import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';

@ApiTags('api/auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Log in' })
  @ApiBody({ description: 'User credentials', type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @Post('/login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Logged in successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'Returned user profile' })
  @ApiCookieAuth('access_token')
  @Get('/profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Log out' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @Get('/logout')
  async logout(@Req() req) {
    req.res.clearCookie('access_token');
    return {
      message: 'Logged out successfully',
    };
  }
}
