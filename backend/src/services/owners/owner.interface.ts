import { Document } from 'mongoose';

export interface Owner extends Document {
  owner: string;
  drips: string[];
}
