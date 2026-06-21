import { ApiProperty } from '@nestjs/swagger';

export class IgdbDeveloperResponseDto {
  @ApiProperty({ description: 'Company ID' })
  id: number;

  @ApiProperty({ description: 'Company name' })
  name: string;

  @ApiProperty({ description: 'Company slug' })
  slug: string;
}
