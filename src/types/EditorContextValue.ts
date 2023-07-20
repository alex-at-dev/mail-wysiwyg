import { TreeEntry } from '../modules/tree';
import { Block } from './Block';
import { ReorderType } from './ReorderType';
import { Uuid4 } from './Uuid';

export interface EditorContextValue<T> {
  selectedBlockId: Uuid4 | null;
  setSelectedBlockId: React.Dispatch<React.SetStateAction<Uuid4 | null>>;
  selectedEntry: TreeEntry<Block<T>>;

  hoveredBlockId: Uuid4;
  setHoveredBlockId: React.Dispatch<React.SetStateAction<Uuid4 | null>>;

  root: Block<T>;
  byId: (id: Uuid4 | null) => TreeEntry<Block<T>> | null;
  getParentThat: (predicate: (node: Block<T>) => boolean, initialId: Uuid4) => Block<T> | null;
  addBlock: (node: Block<T>, parentId: string) => void;
  createBlock: (data: Omit<Block<T>, 'id'>) => Block<T>;
  updateBlock: (updatedBlock: Block<T>) => void;
  removeBlock: (id: Uuid4 | null) => void;
  reorderBlocks: (srcId: Uuid4, targetId: Uuid4 | 'eol', type: ReorderType) => void;
}
