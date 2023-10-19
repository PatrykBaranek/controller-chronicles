import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddGameToCollectionDto } from './dto/add-game-to-collection.dto';
import { CreateNewCollectionDto } from './dto/create-new-collection.dto';
import { DeleteCollectionDto } from './dto/delete-collection.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('api/collections')
@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new collection' })
  @ApiBody({ type: CreateNewCollectionDto })
  @Post('createCollection')
  async createCollection(
    @Req() req,
    @Body() createNewCollectionDto: CreateNewCollectionDto,
  ) {
    return this.collectionsService.createCollection(
      req.user.userId,
      createNewCollectionDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a collection' })
  @ApiBody({ type: DeleteCollectionDto })
  @Delete('deleteCollection')
  async deleteCollection(@Body() deleteCollectionDto: DeleteCollectionDto) {
    return this.collectionsService.deleteCollection(deleteCollectionDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a game to a collection' })
  @ApiBody({ type: AddGameToCollectionDto })
  @Post('addGame')
  async addGame(
    @Body() addGameToCollectionDto: AddGameToCollectionDto,
    @Req() req,
  ) {
    return this.collectionsService.addGame(
      addGameToCollectionDto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all collections of a user' })
  @Get('getCollections')
  async getCollections(@Req() req) {
    return this.collectionsService.getCollections(req.user.userId);
  }
}
