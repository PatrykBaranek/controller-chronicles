import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CollectionsService } from '../services/collections.service';

import { AddGameToCollectionDto } from '../dto/add-game-to-collection.dto';
import { CreateNewCollectionDto } from '../dto/create-new-collection.dto';

import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@ApiTags('api/collections')
@Controller('collections')
@UseGuards(AccessTokenGuard)
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @ApiOperation({ summary: 'Get all collections of a user' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getCollections(@Req() req: Request) {
    return this.collectionsService.getCollections(req.user['sub']);
  }

  @ApiOperation({ summary: 'Create a new collection' })
  @ApiBody({ type: CreateNewCollectionDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCollection(@Req() req: Request, @Body() createNewCollectionDto: CreateNewCollectionDto) {
    return this.collectionsService.createCollection(req.user['sub'], createNewCollectionDto);
  }

  @ApiOperation({ summary: 'Delete a collection' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCollection(@Req() req: Request, @Param('id') collectionId: string) {
    return this.collectionsService.deleteCollection(req.user['sub'], collectionId);
  }

  @ApiOperation({ summary: 'Add a game to a collection' })
  @ApiBody({ type: AddGameToCollectionDto })
  @Post('add-game')
  @HttpCode(HttpStatus.CREATED)
  async addGame(@Body() addGameToCollectionDto: AddGameToCollectionDto) {
    return this.collectionsService.addGameToCollection(addGameToCollectionDto);
  }

  @ApiOperation({ summary: 'Delete a game from a collection' })
  @Delete('/:collectionId/game/:gameId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteGame(@Param('collectionId') collectionId: string, @Param('gameId', ParseIntPipe) gameId: number) {
    return this.collectionsService.deleteGameFromCollection(collectionId, gameId);
  }
}
