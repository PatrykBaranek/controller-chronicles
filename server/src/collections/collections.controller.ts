import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddGameToCollectionDto } from './dto/add-game-to-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addGame')
  async addGame(
    @Body() AddGameToCollectionDto: AddGameToCollectionDto,
    @Req() req,
  ) {
    return this.collectionsService.addGame(
      AddGameToCollectionDto.gameId,
      req.user.userId,
    );
  }
}
