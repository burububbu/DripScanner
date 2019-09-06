import { Document } from 'mongoose';

export interface Drip extends Document {
  codice: string;
  lotto: string;
  composizione: Map<string, number>;
  dosaggioEta: Map<string, number>;
  dosaggioPeso: Map<string, number>;
  quantita: number;
  scadenza: Date;
  temperaturaMax: number;
}
