import { WithId } from './WithId';

export interface Color extends WithId {
  name: string;
  hex: string;
}
