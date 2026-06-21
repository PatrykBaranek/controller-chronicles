import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';

@ApiTags('api/users')
@Controller('users')
export class ProfileController {
  @ApiOperation({ summary: 'Get the current user profile' })
  @ApiResponse({ status: 200, description: 'Returns the current user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('profile')
  getProfile(@Session() session: UserSession) {
    return {
      id: session.user.id,
      email: session.user.email,
    };
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser() {
    return;
  }
}
