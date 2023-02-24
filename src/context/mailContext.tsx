import React, { useState } from 'react';
import { useTree } from '../hooks/useTree';
import { Block } from '../types/Block';
import { Theme } from '../types/Theme';
import { WithChildren } from '../types/WithChildren';

interface MailContextValue {
  theme: Theme;
  selectedBlock: null;
  root: Block;
  addBlock: (node: Block, parentId: string) => void;
  createBlock: (data: Omit<Block, 'id'>) => Block;
  removeBlock: (id: string) => void;
  reorderBlocks: (nodeId: string, orderedChildren: Block[]) => void;
}

const MailContext = React.createContext({} as MailContextValue);

const initialTheme: Theme = {
  fontWeight: 400,
  fontFamily: 'sans-serif',
  fontSize: 16,
  colors: [{ name: 'text-base', hex: '#000' }],
};

export const MailContextProvider: React.FC<WithChildren> = ({ children }) => {
  const tree = useTree<Block>();
  const [theme, setTheme] = useState(initialTheme);

  const contextValue = {
    theme,
    setTheme,
    selectedBlock: null,
    root: tree.root,
    addBlock: tree.addNode,
    createBlock: tree.createNode,
    removeBlock: tree.removeNode,
    reorderBlocks: tree.reorderChildren,
  };

  return <MailContext.Provider value={contextValue}>{children}</MailContext.Provider>;
};

export const useMailContext = () => React.useContext(MailContext);
