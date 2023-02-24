import { Color } from './Color';
import { FontWeight } from './FontWeight';

export interface Theme {
  fontWeight: FontWeight;
  fontSize: number;
  fontFamily: string;
  colors: Color[];
}
