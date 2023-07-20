import { Uuid4 } from './Uuid';

export interface BlockStyle {
  padding?: number;
  color?: Uuid4; // Color.id
  background?: Uuid4; // Color.id
  font?: Uuid4; // FontSetting.id
}
