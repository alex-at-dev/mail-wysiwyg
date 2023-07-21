import { Uuid4 } from './Uuid';

export interface MailLayout {
  bodyBg: Uuid4 | null;
  mailBg: Uuid4 | null;
  mailWidth: number;
}
