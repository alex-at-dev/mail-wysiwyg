import { MutableRefObject, useRef, useState } from 'react';
import { TNode, Tree } from '../modules/tree';

export function useTree<T extends TNode>() {
  const tree = useRef<Tree<T>>(null) as MutableRefObject<Tree<T>>;
  if (tree.current === null) tree.current = new Tree<T>();
  const [root, setRoot] = useState(tree.current.getRoot());

  /**
   * Proxies the given function to update the root node after {@link fn} has run.
   * Used on all update actions.
   * @param fn function to run / proxy
   * @returns type-safe proxied function
   */
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

  const byId = (id: string | null) => {
    if (id === null) return null;
    return tree.current.byId[id] || null;
  };

  return {
    root,
    byId,
    getParentThat: tree.current.getParentThat.bind(tree.current),
    createNode: _proxyAction(tree.current.createNode),
    addNode: _proxyAction(tree.current.addNode),
    removeNode: _proxyAction(tree.current.removeNode),
    updateNode: _proxyAction(updateNode),
    reorderChildren: _proxyAction(tree.current.reorderChildren),
  };
}
