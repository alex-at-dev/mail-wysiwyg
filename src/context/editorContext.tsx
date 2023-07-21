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

  const updateSelectedBlockId = (id: Uuid4 | null) => {
    setSelectedBlockId(id);
    setSelectedEntry(tree.byId(id));
  };

  const addBlock = (node: Block<T>, parentId: Uuid4, index?: number | undefined) => {
    tree.addNode(node, parentId, index);
    updateSelectedBlockId(node.id);
  };

  const removeBlock = (id: Uuid4 | null, parentRemoved?: boolean, transient?: boolean) => {
    if (!id) return;
    if (id === selectedBlockId) {
      const parent = tree.getParentThat(
        (n) => n.type === 'row' || n.type === 'root',
        selectedBlockId
      );
      const children = parent?.children;
      if (children && children.length > 1) {
        let index = children.findIndex((b) => b.id === selectedBlockId);
        if (index === children.length - 1) index--;
        else index++;
        updateSelectedBlockId(children[index].id);
      } else if (parent) {
        updateSelectedBlockId(parent.id);
      } else {
        updateSelectedBlockId(null);
      }
    }
    tree.removeNode(id, parentRemoved, transient);
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
    addBlock,
    removeBlock,
    updateBlock,
    reorderBlocks: tree.reorderChildren,
  };

  return (
    <EditorContext.Provider value={contextValue as unknown as EditorContextValue<unknown>}>
      {children}
    </EditorContext.Provider>
  );
};
