import { Schema, Document } from 'mongoose';

export interface CollectionMetadata extends Document {
  name: string;
  structure: any;
}

export const CollectionMetadataSchema = new Schema({
  name: { type: String, required: true },
  structure: { type: Schema.Types.Mixed, required: true }
});
