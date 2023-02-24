import React, { useState } from 'react';
import { useTree } from '../hooks/useTree';
import { Block } from '../types/Block';
import { Theme } from '../types/Theme';
import { WithChildren } from '../types/WithChildren';

interface MailContextValue {
  theme: Theme;
  selectedBlock: null;
  root: Block;
  addBlock: (node: Block, parent: Block) => void;
  createBlock: (data: Omit<Block, 'id'>) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (nodeId: string, orderedChildren: Block[]) => void;
}

const getInitialContextValue = (): MailContextValue => ({
  theme: {
    fontWeight: 400,
    fontFamily: 'sans-serif',
    fontSize: 16,
    colors: [{ name: 'text-base', hex: '#000' }],
  },
  selectedBlock: null,
  root: { id: '', type: 'root' },
  addBlock: () => {},
  createBlock: () => {},
  removeBlock: () => {},
  reorderBlocks: () => {},
});

const MailContext = React.createContext(getInitialContextValue());

export const MailContextProvider: React.FC<WithChildren> = ({ children }) => {
  const tree = useTree<Block>();
  const [theme, setTheme] = useState(getInitialContextValue().theme);

  const contextValue = {
    theme,
    setTheme,
    selectedBlock: null,
    root: tree.state.root,
    addBlock: tree.addNode,
    createBlock: tree.createNode,
    removeBlock: tree.removeNode,
    reorderBlocks: tree.reorderChildren,
  };

  return <MailContext.Provider value={contextValue}>{children}</MailContext.Provider>;
};

export const useMailContext = () => React.useContext(MailContext);
