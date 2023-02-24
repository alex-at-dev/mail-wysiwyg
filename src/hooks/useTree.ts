import { useReducer } from 'react';
import { TNode, Tree } from '../modules/tree';

const A_ADD_NODE = 'addNode';
const A_CREATE_NODE = 'createNode';
const A_REMOVE_NODE = 'removeNode';
const A_REORDER_CHILDREN = 'reorderChildren';

function reducer<T extends TNode>(tree: Tree<T>, action: any) {
  console.log('reducer', action, tree);
  if (action.type === A_CREATE_NODE) {
    tree.createNode(action.data);
  } else if (action.type === A_ADD_NODE) {
    tree.addNode(action.node, action.parentId);
  } else if (action.type === A_REMOVE_NODE) {
    tree.removeNode(action.id);
  } else if (action.type === A_REORDER_CHILDREN) {
    tree.reorderChildren(action.nodeId, action.orderedChildren);
  }
  return tree;
}

export function useTree<T extends TNode>() {
  const [tree, dispatch] = useReducer(reducer, new Tree<T>());

  const createNode = (data: Omit<T, 'id'>) => dispatch({ type: A_CREATE_NODE, data });
  const addNode = (node: T, parent: T) => dispatch({ type: A_ADD_NODE, node, parent });
  const removeNode = (id: string) => dispatch({ type: A_REMOVE_NODE, id });
  const reorderChildren = (nodeId: string, orderedChildren: T[]) =>
    dispatch({ type: A_REORDER_CHILDREN, nodeId, orderedChildren });

  return { state: tree as Tree<T>, createNode, addNode, removeNode, reorderChildren };
}
