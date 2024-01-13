import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { Request } from 'express';
import { GetUserDto } from '../dto/get-user.dto';

@ApiTags('api/users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <access_token>',
  })
  @Get('profile')
  @UseGuards(AccessTokenGuard)
  async getProfile(@Req() req: Request): Promise<GetUserDto> {
    const userDocument = await this.usersService.findById(req.user['sub']);

    return {
      email: userDocument.email
    };
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <access_token>',
  })
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}