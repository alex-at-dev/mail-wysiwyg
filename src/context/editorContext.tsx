import React, { useState } from 'react';
import { useTree } from '../hooks/useTree';
import { Block } from '../types/Block';
import { EditorContextValue } from '../types/EditorContextValue';
import { Theme } from '../types/Theme';
import { WithChildren } from '../types/WithChildren';

const THEME_STORAGE_KEY = 'theme';
const EDITOR_CONTEXT_STORAGE_KEY = 'editorContext';

export const EditorContext = React.createContext({} as EditorContextValue<unknown>);

const initialTheme: Theme = {
  font: {
    weight: 400,
    family: 'sans-serif',
    size: 16,
  },
  colors: [
    { id: crypto.randomUUID(), name: 'white', hex: '#ffffff' },
    { id: crypto.randomUUID(), name: 'neutral-50', hex: '#fafafa' },
    { id: crypto.randomUUID(), name: 'neutral-100', hex: '#f5f5f5' },
    { id: crypto.randomUUID(), name: 'neutral-200', hex: '#e5e5e5' },
    { id: crypto.randomUUID(), name: 'neutral-300', hex: '#d4d4d4' },
    { id: crypto.randomUUID(), name: 'neutral-400', hex: '#a3a3a3' },
    { id: crypto.randomUUID(), name: 'neutral-500', hex: '#737373' },
    { id: crypto.randomUUID(), name: 'neutral-600', hex: '#525252' },
    { id: crypto.randomUUID(), name: 'neutral-700', hex: '#404040' },
    { id: crypto.randomUUID(), name: 'neutral-800', hex: '#262626' },
    { id: crypto.randomUUID(), name: 'neutral-900', hex: '#171717' },
  ],
  layout: {
    bodyBg: 'grey100',
    mailBg: 'white',
    mailWidth: 644,
  },
};

const getInitialTheme = () => {
  const fromStorage = localStorage.getItem(THEME_STORAGE_KEY);
  if (fromStorage) return JSON.parse(fromStorage);
  return initialTheme;
};

export const EditorContextProvider = <T extends unknown>({ children }: WithChildren) => {
  const tree = useTree<Block<T>>(EDITOR_CONTEXT_STORAGE_KEY);
  const [theme, setTheme] = useState(getInitialTheme());
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const updateBlock = (updatedBlock: Block<T>) => {
    tree.updateNode(updatedBlock);
  };

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
    setTheme(newTheme);
  };

  const contextValue = {
    theme,
    setTheme: handleSetTheme,

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
