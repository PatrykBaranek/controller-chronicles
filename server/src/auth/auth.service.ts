import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/models/user.schema';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User, response: Response) {
    const tokenPayload = { userId: user };

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 3600);

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
