import { FontWeight } from './FontWeight';
import { WithId } from './WithId';

export interface FontSetting extends WithId {
  name: string;
  weight: FontWeight;
  size: number;
  lineHeight: number;
  family: string;
}
