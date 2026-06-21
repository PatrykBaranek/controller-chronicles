import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';

@ApiTags('api/users')
@Controller('users')
export class ProfileController {
  @Get('profile')
  getProfile(@Session() session: UserSession) {
    return {
      id: session.user.id,
      email: session.user.email,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser() {
    return;
  }
}
