import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { CollectionMetadataSchema } from './data.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mydb'),
    MongooseModule.forFeature([{ name: 'CollectionMetadata', schema: CollectionMetadataSchema }])
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
