import React, { PropsWithChildren, useState } from 'react';
import { useTree } from '../hooks/useTree';
import { Block } from '../types/Block';
import { EditorContextValue } from '../types/EditorContextValue';

/**
 * NOTE: Don't use this context directly, instead use hooks/useEditorContext.
 */

const EDITOR_CONTEXT_STORAGE_KEY = 'editorContext';

export const EditorContext = React.createContext({} as EditorContextValue<unknown>);

export const EditorContextProvider = <T extends unknown>({ children }: PropsWithChildren) => {
  const tree = useTree<Block<T>>(EDITOR_CONTEXT_STORAGE_KEY);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const updateBlock = (updatedBlock: Block<T>) => {
    tree.updateNode(updatedBlock);
  };

  const contextValue = {
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
