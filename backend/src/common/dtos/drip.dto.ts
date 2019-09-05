import { Document } from 'mongoose';

export interface Drip extends Document {
  id: string;
  shareable: boolean;
  expireDate: Date;
}
