import { TNode } from '../modules/tree';
import { BlockType } from './BlockType';

export interface Block extends TNode {
  type: BlockType;
  content?: string;
  children?: Block[];
}
