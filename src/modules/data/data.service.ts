import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectionMetadata } from './data.model';
import { CollectionMetadataDto } from './data.dto';
@Injectable()
export class DataService {
  constructor(
    @InjectModel('CollectionMetadata') private readonly metadataModel: Model<CollectionMetadata>,
  ) {}

  async saveCollectionMetadata(name: string, structure: any) {
    const metadata = new this.metadataModel({ name, structure });
    return await metadata.save();
  }

  async getAllMetadata() {
    return await this.metadataModel.find().exec();
  }

  async updateCollection(collectionId: string, metadataDto: CollectionMetadataDto): Promise<CollectionMetadata> {
  const collection = await this.metadataModel.findById(collectionId);
  if (!collection) {
    throw new NotFoundException(`Collection with ID ${collectionId} not found`);
  }

  collection.name = metadataDto.name;
  collection.structure = metadataDto.structure;

  return collection.save();
}
}
