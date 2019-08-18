import * as mongoose from 'mongoose';

export const OwnerSchema = new mongoose.Schema({
  owner: mongoose.SchemaTypes.String,
  drips: [mongoose.SchemaTypes.String],
});
