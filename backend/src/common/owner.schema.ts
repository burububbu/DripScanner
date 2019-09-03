import * as mongoose from 'mongoose';

export const DripSchema = new mongoose.Schema({
  id: mongoose.SchemaTypes.String,
  shareable: mongoose.SchemaTypes.Boolean,
});

export const OwnerSchema = new mongoose.Schema({
  owner: mongoose.SchemaTypes.String,
  drips: [DripSchema],
});
