import { Color } from './Color';
import { FontSetting } from './FontSetting';

export interface Theme {
  layout: {
    bodyBg: string;
    mailBg: string;
    mailWidth: number;
  };
  fonts: FontSetting[];
  colors: Color[];
}
