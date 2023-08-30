import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { DataService } from './data.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@Controller('metadata')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()

  async saveMetadata(@Body() body: { name: string, structure: any }) {
    return this.dataService.saveCollectionMetadata(body.name, body.structure);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllMetadata() {
    return this.dataService.getAllMetadata();
  }
}
