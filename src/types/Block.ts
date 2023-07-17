import { TNode } from '../modules/tree';
import { BlockStyle } from './BlockStyle';
import { BlockType } from './BlockType';

export interface Block<T = unknown> extends TNode {
  type: BlockType;
  label?: string;
  content?: string;
  children?: Block<T>[];
  data?: T;
  style: BlockStyle;
}
