import React, { PropsWithChildren, useState } from 'react';
import { useTree } from '../hooks/useTree';
import { TreeEntry } from '../modules/tree';
import { Block } from '../types/Block';
import { EditorContextValue } from '../types/EditorContextValue';
import { Uuid4 } from '../types/Uuid';

/**
 * NOTE: Don't use this context directly, instead use hooks/useEditorContext.
 */

const EDITOR_CONTEXT_STORAGE_KEY = 'editorContext';

export const EditorContext = React.createContext({} as EditorContextValue<unknown>);

export const EditorContextProvider = <T extends unknown>({ children }: PropsWithChildren) => {
  const tree = useTree<Block<T>>(EDITOR_CONTEXT_STORAGE_KEY);
  const [selectedBlockId, setSelectedBlockId] = useState<Uuid4 | null>(null);
  const [hoveredBlockId, setHoveredBlockId] = useState<Uuid4 | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<TreeEntry<Block<T>> | null>(null);

  const updateBlock = (updatedBlock: Block<T>) => {
    tree.updateNode(updatedBlock);
  };

  const updateSelectedBlockId = (id: Uuid4) => {
    setSelectedBlockId(id);
    setSelectedEntry(tree.byId(id));
  };

  const contextValue = {
    selectedBlockId,
    setSelectedBlockId: updateSelectedBlockId,
    selectedEntry,
    hoveredBlockId,
    setHoveredBlockId,

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
