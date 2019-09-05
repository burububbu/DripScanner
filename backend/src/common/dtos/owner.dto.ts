import { Document } from 'mongoose';
import { Drip } from './drip.dto';

export interface Owner extends Document {
  owner: string;
  drips: Drip[];
}
