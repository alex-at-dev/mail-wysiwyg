import React, { useState } from 'react';
import { useTree } from '../hooks/useTree';
import { TreeEntry } from '../modules/tree';
import { Block } from '../types/Block';
import { ReorderType } from '../types/ReorderType';
import { Theme } from '../types/Theme';
import { WithChildren } from '../types/WithChildren';

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

export const EditorContext = React.createContext({} as EditorContextValue<unknown>);

const initialTheme: Theme = {
  fontWeight: 400,
  fontFamily: 'sans-serif',
  fontSize: 16,
  colors: [{ name: 'text-base', hex: '#000' }],
};

export const EditorContextProvider = <T extends unknown>({ children }: WithChildren) => {
  const tree = useTree<Block<T>>('editorContext');
  const [theme, setTheme] = useState(initialTheme);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const updateBlock = (updatedBlock: Block<T>) => {
    tree.updateNode(updatedBlock);
  };

  const contextValue = {
    theme,
    setTheme,

    selectedBlockId,
    setSelectedBlockId,

    root: tree.root,
    byId: tree.byId,
    getParentThat: tree.getParentThat,
    createBlock: tree.createNode,
    addBlock: tree.addNode,
    removeBlock: tree.removeNode,
    updateBlock,
    reorderBlocks: tree.reorderChildren,
  };

  return (
    <EditorContext.Provider value={contextValue as unknown as EditorContextValue<unknown>}>
      {children}
    </EditorContext.Provider>
  );
};
