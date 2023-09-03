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
    // Save metadata to the existing metadata collection
    const metadata = new this.metadataModel({ name, structure });
    await metadata.save();
    
    // Create a new collection based on the provided name
    const newCollection = this.metadataModel.db.collection(name);
    
    // If a structure is defined, insert a dummy document and remove it immediately
    if (structure) {
      const dummyDoc = await newCollection.insertOne(structure);
      await newCollection.deleteOne({ _id: dummyDoc.insertedId });
    }
    
    return metadata;
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
