import { Color } from './Color';
import { FontSetting } from './FontSetting';
import { MailLayout } from './MailLayout';

export interface Theme {
  layout: MailLayout;
  fonts: FontSetting[];
  colors: Color[];
}
