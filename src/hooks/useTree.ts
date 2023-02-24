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

  return {
    root,
    createNode: _proxyAction(tree.current.createNode),
    addNode: _proxyAction(tree.current.addNode),
    removeNode: _proxyAction(tree.current.removeNode),
    reorderChildren: _proxyAction(tree.current.reorderChildren),
  };
}
