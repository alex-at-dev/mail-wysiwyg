import { TreeEntry } from '../modules/tree';
import { Block } from './Block';
import { ReorderType } from './ReorderType';
import { Theme } from './Theme';

export interface EditorContextValue<T> {
  theme: Theme;
  setTheme: (theme: Theme) => void;

  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;

  root: Block<T>;
  byId: (id: string | null) => TreeEntry<Block<T>> | null;
  getParentThat: (predicate: (node: Block<T>) => boolean, initialId: string) => Block<T> | null;
  addBlock: (node: Block<T>, parentId: string) => void;
  createBlock: (data: Omit<Block<T>, 'id'>) => Block<T>;
  updateBlock: (updatedBlock: Block<T>) => void;
  removeBlock: (id: string | null) => void;
  reorderBlocks: (srcId: string, targetId: string, type: ReorderType) => void;
}
