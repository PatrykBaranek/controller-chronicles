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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @UseGuards(JwtAuthGuard)
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
  @Delete('deleteCollection')
  async deleteCollection(@Body() deleteCollectionDto: DeleteCollectionDto) {
    return this.collectionsService.deleteCollection(deleteCollectionDto);
  }

  @UseGuards(JwtAuthGuard)
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
  @Get('getCollections')
  async getCollections(@Req() req) {
    return this.collectionsService.getCollections(req.user.userId);
  }
}
