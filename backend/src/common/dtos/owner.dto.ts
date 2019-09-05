import { Document } from 'mongoose';

export interface Drip extends Document {
  id: string;
  shareable: boolean;
}

export interface Owner extends Document {
  owner: string;
  drips: Drip[];
}
