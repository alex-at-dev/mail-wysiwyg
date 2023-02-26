import React, { useState } from 'react';
import { useTree } from '../hooks/useTree';
import { TreeEntry } from '../modules/tree';
import { Block } from '../types/Block';
import { Theme } from '../types/Theme';
import { WithChildren } from '../types/WithChildren';

interface EditorContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;

  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;

  root: Block;
  byId: (id: string) => TreeEntry<Block>;
  getParentThat: (predicate: (node: Block) => boolean, initialId: string) => Block | null;
  addBlock: (node: Block, parentId: string) => void;
  createBlock: (data: Omit<Block, 'id'>) => Block;
  updateBlock: (updatedBlock: Block) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (nodeId: string, orderedChildren: Block[]) => void;
}

const EditorContext = React.createContext({} as EditorContextValue);

const initialTheme: Theme = {
  fontWeight: 400,
  fontFamily: 'sans-serif',
  fontSize: 16,
  colors: [{ name: 'text-base', hex: '#000' }],
};

export const EditorContextProvider: React.FC<WithChildren> = ({ children }) => {
  const tree = useTree<Block>();
  const [theme, setTheme] = useState(initialTheme);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

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
    updateBlock: tree.updateNode,
    reorderBlocks: tree.reorderChildren,
  };

  return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>;
};

export const useEditorContext = () => React.useContext(EditorContext);
