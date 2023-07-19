import { Color } from './Color';
import { FontWeight } from './FontWeight';

export interface Theme {
  layout: {
    bodyBg: string;
    mailBg: string;
    mailWidth: number;
  };
  font: {
    weight: FontWeight;
    size: number;
    family: string;
  };
  colors: Color[];
}
