import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/services/users.service';
import { HashService } from './hash.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const userExists = await this.usersService.findByEmail(email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    this.eventEmitter.emit('user.welcome', { email });

    const hashedPassword = await this.hashService.hashData(password);
    const newUser = await this.usersService.create({ ...createUserDto, password: hashedPassword });
    const tokens = await this.getTokens(newUser._id, newUser.email);

    await this.updateRefreshToken(newUser._id, tokens.refresh_token);

    return tokens;
  }

  public async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const passwordMatches = await this.hashService.compare(password, user.password);

    if (!passwordMatches) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refresh_token);

    return tokens;
  }

  public async requestPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const resetToken = await this.jwtService.signAsync({ email }, { secret: this.configService.get<string>('JWT_RESET_SECRET'), expiresIn: '15m' });
    const link = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${resetToken}`;

    this.eventEmitter.emit('user.reset-password', { email, link });

    await this.usersService.update(user._id, { reset_token: resetToken });
  }

  public async resetPassword(token: string, password: string) {
    const { email } = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('JWT_RESET_SECRET') });
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.reset_token) {
      throw new BadRequestException('Invalid token');
    }

    const hashedPassword = await this.hashService.hashData(password);
    await this.usersService.update(user._id, { password: hashedPassword, reset_token: null });
  }

  public async logout(userId: string) {
    return this.usersService.update(userId, { refresh_token: null });
  }

  public async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refresh_token) {
      throw new BadRequestException('Access Denied');
    }

    const refreshTokenMatches = await this.hashService.compare(refreshToken, user.refresh_token);

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refresh_token);

    return tokens;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashService.hashData(refreshToken);
    await this.usersService.update(userId, { refresh_token: hashedRefreshToken });
  }

  private async getTokens(userId: string, email: string) {
    const accessTokenPayload  = { email, sub: userId };
    const refreshTokenPayload = { email, sub: userId, tokenType: 'refresh' };

    const access_token  = await this.jwtService.signAsync(accessTokenPayload, { secret: this.configService.get<string>('JWT_ACCESS_SECRET'), expiresIn: '15m' });
    const refresh_token = await this.jwtService.signAsync(refreshTokenPayload, { secret: this.configService.get<string>('JWT_REFRESH_SECRET'), expiresIn: '7d' });

    return {
      access_token,
      access_token_expires_in: 15,
      refresh_token,
      refresh_token_expires_in: 7 * 24 * 60,
    };
  }
}
