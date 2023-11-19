import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { HashService } from './services/hash.service';

import { UsersModule } from 'src/users/users.module';

import { AuthController } from './controllers/auth.controller';

import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({}),
    JwtModule.register({})
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, HashService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
