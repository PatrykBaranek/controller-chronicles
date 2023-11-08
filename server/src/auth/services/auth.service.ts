import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { HashService } from '../users/hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const user = await this.usersService.findByEmail(email);

    const isPasswordMatching = await this.hashService.comparePassword(plainTextPassword, user.password);

    if (!user || !isPasswordMatching)
    {
      return null;
    }

    return user;
  }

  public async login(user: any) {
    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
