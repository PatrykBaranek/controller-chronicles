import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

import { LoginUserDto } from '../dto/login-user.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@ApiTags('api/auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create user', description: 'Registers a new user in the system.' })
  @ApiBody({ type: CreateUserDto, description: 'User creation data.' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreateUserDto, // If you have a specific response DTO, use it here
  })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: 'Log in', description: 'Authenticates a user and provides tokens.' })
  @ApiBody({ description: 'User login credentials', type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully' }) // Assuming TokenResponseDto as a response type
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh token', description: 'Refreshes access tokens using a refresh token.' })
  @ApiHeader({ name: 'Authorization', description: 'Refresh token', required: true })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Log out', description: 'Logs out the user by invalidating the access token.' })
  @ApiHeader({ name: 'Authorization', description: 'Access token', required: true })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
    return { message: 'Logged out successfully' };
  }

  @ApiOperation({ summary: 'Request password reset', description: 'Requests a password reset for a user.' })
  @ApiQuery({ name: 'email', type: String, description: 'User email for password reset' })
  @ApiResponse({ status: 200, description: 'Password reset requested' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Post('request-reset-password')
  @HttpCode(HttpStatus.OK)
  async requestResetPassword(@Query('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @ApiOperation({ summary: 'Reset password', description: 'Resets the password for a user.' })
  @ApiQuery({ name: 'token', type: String, description: 'Password reset token' })
  @ApiBody({ type: ResetPasswordDto, description: 'New password data' })
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Query('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(token, resetPasswordDto.password);
  }
}
