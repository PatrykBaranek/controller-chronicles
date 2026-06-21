import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CollectionsService } from '../services/collections.service';

import { AddGameToCollectionDto } from '../dto/add-game-to-collection.dto';
import { CreateNewCollectionDto } from '../dto/create-new-collection.dto';
import { Session, UserSession } from '@thallesp/nestjs-better-auth';

@ApiTags('api/collections')
@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @ApiOperation({ summary: 'Get all collections of a user' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getCollections(@Session() session: UserSession) {
    return this.collectionsService.getCollections(session.user.id);
  }

  @ApiOperation({ summary: 'Create a new collection' })
  @ApiBody({ type: CreateNewCollectionDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCollection(
    @Session() session: UserSession,
    @Body() createNewCollectionDto: CreateNewCollectionDto,
  ) {
    return this.collectionsService.createCollection(session.user.id, createNewCollectionDto);
  }

  @ApiOperation({ summary: 'Delete a collection' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCollection(@Session() session: UserSession, @Param('id') collectionId: string) {
    return this.collectionsService.deleteCollection(session.user.id, collectionId);
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
  async deleteGame(
    @Param('collectionId') collectionId: string,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return this.collectionsService.deleteGameFromCollection(
      collectionId,
      gameId,
    );
  }
}
