import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectionMetadata } from './data.model';

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
}
