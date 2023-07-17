import { ReorderType } from '../types/ReorderType';

// TODO Unit-tests

/**
 * magic id to reorder an item to the end of the tree (end of list).
 * @example reorderChildren('node-1337', 'eol', 'whatever') -> puts 'node-1337' as last child of root.
 */
export const EOL = 'eol';

// TODO export types?
export interface TNode {
  id: string;
  children?: TNode[];
}

export interface TreeEntry<T extends TNode> {
  node: T;
  parent: string | null;
}

export class Tree<T extends TNode> {
  root: T;
  byId: { [id: string]: TreeEntry<T> };

  constructor(rootData?: any) {
    this.root = this.createNode(rootData || {});
    this.byId = { [this.root.id]: { node: this.root, parent: null } };
  }

  /**
   * Find the closest parent of {@link initialId} that matches {@link predicate}.
   * @param predicate function to check if given parent is the one searched for.
   * @param initialId node.id to start from.
   * @returns closest parent of {@link initialId} that matches {@link predicate} or null.
   */
  getParentThat(predicate: (node: T) => boolean, initialId: string): T | null {
    let id: string | null = initialId;
    while (id) {
      const entry = this.getEntry(id);
      if (!entry) return null;
      if (predicate(entry.node)) return entry.node;
      id = entry.parent;
    }
    return null;
  }

  /**
   * Create a new node with a corresponding id.
   * @param data node data.
   * @returns node data plus id ready to be passed to {@link addNode}.
   */
  createNode(data: Omit<T, 'id'>) {
    const id = crypto.randomUUID();
    return { ...data, id } as T;
  }

  /**
   * Adds the given {@link node} to {@link parent}. Will do nothing,
   * if {@link parent} isn't in the tree or {@link node} is already present in the tree.
   * @param node node to add.
   * @param parent parent to add to.
   * @param index optional add-index. By default this is children.length.
   */
  addNode(node: T, parentId: string, index?: number) {
    // get real parent, as the given parent could be a copy
    const parentEntry = this.getEntry(parentId)?.node;
    if (!parentEntry || this.getEntry(node.id)) return;
    if (!parentEntry.children) parentEntry.children = [];
    if (index === undefined) index = parentEntry.children.length;
    parentEntry.children.splice(index, 0, node);
    this.byId[node.id] = { node, parent: parentEntry.id };
  }

  /**
   * Removes node with given {@link id}.
   * @param id node.id to remove.
   * @param parentRemoved If true, doesn't remove node from its parents children array.
   * @param transient If true doesn't remove children. Used for reordering.
   */
  removeNode(id: string | null, parentRemoved = false, transient = false) {
    if (!id) return;
    const entry = this.getEntry(id);
    if (!entry || !entry.node) return;
    // remove entry in byId
    delete this.byId[entry.node.id];
    // remove child entry in parent node
    if (!parentRemoved && entry.parent) {
      const parent = this.getEntry(entry.parent);
      if (!parent?.node?.children) return;
      const i = parent.node.children.findIndex((i) => i.id === id);
      if (i < 0) return;
      parent.node.children.splice(i, 1);
    }
    // remove child nodes
    if (!transient && entry.node.children?.length) {
      entry.node.children.forEach((n) => this.removeNode(n.id, true));
    }
  }

  /**
   * Reorders children by ordering {@link srcId} before, after or as child of {@link targetId}, depending on {@link type}.
   * @param srcId id of the node to move.
   * @param targetId target node id
   * @param type type of reorder. One of before, after, inside (see exact strings in type-definition)
   */
  reorderChildren(srcId: string, targetId: string, type: ReorderType) {
    const srcEntry = this.getEntry(srcId);
    if (!srcEntry?.node) return;
    let targetEntry = this.getEntry(targetId);
    // if item dragged on EOL, put it at the end of root
    if (targetId === EOL) {
      targetEntry = this.getEntry(this.root.id);
      type = 'insertInto';
    }
    this.removeNode(srcEntry.node.id, false, true);

    if (!targetEntry) return;
    if (type === 'insertInto') {
      this.addNode(srcEntry.node, targetEntry.node.id);
    } else if (
      // dropped on bottom third of a filled container -> add item as first child
      type === 'putAfter' &&
      (targetEntry.node.children?.length || srcEntry.parent === targetId)
    ) {
      this.addNode(srcEntry.node, targetId, 0);
    } else {
      // put before / after target
      // Important: Calculate target index after removing the node to prevent index errors
      if (!targetEntry?.parent) return;
      const parent = this.getEntry(targetEntry.parent);
      if (!parent?.node.children) return;
      let targetIndex = parent.node.children.findIndex((b) => b.id === targetId);
      if (targetIndex < 0) return;
      if (type === 'putAfter') targetIndex += 1;
      this.addNode(srcEntry.node, targetEntry.parent, targetIndex);
    }
  }

  /**
   * Get a copy of root. Used to trigger react update.
   * @returns copy of {@link this.root}.
   */
  getRoot() {
    return { ...this.root };
  }

  serialize() {
    return JSON.stringify(this.root);
  }

  deserialize(val: string) {
    console.log('deserialize', val);
  }

  /**
   * Returns an entry by it's id.
   * @param id entry id.
   * @returns entry or null if entry / entry.node doesn't exist.
   */
  private getEntry(id: string) {
    const _entry = this.byId[id];
    if (!_entry || !_entry.node) return null;
    return _entry;
  }
}
