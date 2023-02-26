import { MutableRefObject, useRef, useState } from 'react';
import { TNode, Tree } from '../modules/tree';

export function useTree<T extends TNode>() {
  const tree = useRef<Tree<T>>(null) as MutableRefObject<Tree<T>>;
  if (tree.current === null) tree.current = new Tree<T>();
  const [root, setRoot] = useState(tree.current.getRoot());

  const _proxyAction = <A extends any[], R>(fn: (...args: A) => R) => {
    return (...args: A): R => {
      const res = fn.apply(tree.current, args);
      setRoot(tree.current.getRoot());
      return res;
    };
  };

  const updateNode = (updatedNode: T) => {
    const entry = tree.current.byId[updatedNode.id];
    if (!entry || !entry.node) return;
    Object.assign(entry.node, updatedNode);
  };

  return {
    root,
    byId: (id: string) => tree.current.byId[id],
    getParentThat: tree.current.getParentThat.bind(tree.current),
    createNode: _proxyAction(tree.current.createNode),
    addNode: _proxyAction(tree.current.addNode),
    removeNode: _proxyAction(tree.current.removeNode),
    updateNode: _proxyAction(updateNode),
    reorderChildren: _proxyAction(tree.current.reorderChildren),
  };
}
