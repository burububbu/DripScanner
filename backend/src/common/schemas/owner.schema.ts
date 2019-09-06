import { SchemaTypes, Schema } from 'mongoose';

export const DripSchema = new Schema({
  id: SchemaTypes.String,
  shareable: SchemaTypes.Boolean,
  expireDate: SchemaTypes.Date,
});

export const OwnerSchema = new Schema({
  owner: SchemaTypes.String,
  drips: [DripSchema],
});
