import { Controller, Get, Post, Body, UseGuards, NotFoundException, Param, Put } from '@nestjs/common';
import { DataService } from './data.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { CollectionMetadataDto } from './data.dto';

@Controller('metadata')
export class DataController {
  constructor(private readonly dataService: DataService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CollectionMetadataDto })

  async saveMetadata(@Body() body: { name: string, structure: any }) {
    return this.dataService.saveCollectionMetadata(body.name, body.structure);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllMetadata() {
    return this.dataService.getAllMetadata();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CollectionMetadataDto })
  async updateCollection(@Param('id') id: string, @Body() metadataDto: CollectionMetadataDto) {
    const updatedMetadata = await this.dataService.updateCollection(id, metadataDto);
    if (!updatedMetadata) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }
    return updatedMetadata;
  }
}
