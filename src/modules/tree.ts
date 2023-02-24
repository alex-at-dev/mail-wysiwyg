import { getNextId } from './util';

export interface TNode {
  id: string;
  children?: TNode[];
}

interface TreeEntry<T extends TNode> {
  node: T;
  parent: string | null;
}

export class Tree<T extends TNode> {
  nodeName: string = 'node';
  root: T;
  byId: { [id: string]: TreeEntry<T> };

  constructor(nodeName?: string, rootData?: any) {
    if (nodeName) this.nodeName = nodeName;
    this.root = this.createNode(rootData || {});
    this.byId = { [this.root.id]: { node: this.root, parent: null } };
  }

  createNode(data: Omit<T, 'id'>) {
    const id = getNextId('node');
    return { ...data, id } as T;
  }

  /**
   * Adds the given {@link node} to {@link parent}. Will do nothing,
   * if {@link parent} isn't in the tree or {@link node} is already present in the tree.
   * @param node node to add.
   * @param parent parent to add to.
   */
  addNode(node: T, parentId: string) {
    // get real parent, as the given parent could be a copy
    const pEntry = this._getEntry(parentId)?.node;
    if (!pEntry || this.byId[node.id]) return;
    if (!pEntry.children) pEntry.children = [];
    pEntry.children.push(node);
    this.byId[node.id] = { node, parent: pEntry.id };
  }

  removeNode(id: string) {
    // get real node
    const entry = this._getEntry(id);
    // remove entry in byId
    if (!entry || !entry.node) return;
    delete this.byId[entry.node.id];
    // remove child entry in parent node
    if (!entry.parent) return;
    const parent = this._getEntry(entry.parent);
    if (!parent?.node?.children) return;
    const i = parent.node.children.findIndex((i) => i.id === id);
    if (i < 0) return;
    parent.node.children.splice(i, 1);
  }

  reorderChildren(nodeId: string, orderedChildren: T[]) {
    const entry = this._getEntry(nodeId);
    if (!entry?.node?.children) return;
    const orderedIds = orderedChildren.map((n) => n.id);
    entry.node.children.sort((a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id));
  }

  _getEntry(id: string) {
    const _entry = this.byId[id];
    if (!_entry || !_entry.node) return null;
    return _entry;
  }
}
