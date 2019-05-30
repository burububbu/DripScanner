import * as mongoose from 'mongoose';

export const DripSchema = new mongoose.Schema({
  codice: mongoose.SchemaTypes.String,
  lotto: mongoose.SchemaTypes.String,
  composizione: { type: Map, of: mongoose.SchemaTypes.Number },
  dosaggioEta: { type: Map, of: mongoose.SchemaTypes.Number },
  dosaggioPeso: { type: Map, of: mongoose.SchemaTypes.Number },
  quantita: mongoose.SchemaTypes.Number,
  scadenza: Date,
  temperaturaMax: mongoose.SchemaTypes.Number,
});
