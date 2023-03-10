import { TNode } from '../modules/tree';
import { BlockType } from './BlockType';

export interface Block extends TNode {
  type: BlockType;
  label?: string;
  content?: string;
  children?: Block[];
}
