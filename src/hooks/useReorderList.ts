import { DragEvent } from 'react';
import { DragConfig } from '../types/DragConfig';
import { ReorderHandlers } from '../types/ReorderHandlers';
import { ReorderType } from '../types/ReorderType';
import { Uuid4 } from '../types/Uuid';
import { Uuid4OrEol } from '../types/Uuid4OrEol';

// TODO cleanup this files head section

// add empty canvas as dragImage (must be in the dom for chrome)
const dragImage = document.createElement('canvas');
dragImage.width = dragImage.height = 1;
dragImage.style.position = 'absolute';
dragImage.style.left = '-100%';
document.body.appendChild(dragImage);

type DragEv = DragEvent<HTMLElement>;
type DragHandler = (ev: DragEv, id: Uuid4OrEol) => void;

const defaultConfig = {
  isContainer: false,
  dropAtTopCls: 'rl--drop-top',
  dropAtBottomCls: 'rl--drop-bottom',
  dropIntoCls: 'rl--drop-into',
};

export const useReorderList = (
  onItemsReordered: (dragId: Uuid4, dropId: Uuid4OrEol, type: ReorderType) => void,
  config?: Partial<DragConfig>
) => {
  /** hook-level config. May be overwritten per element. */
  const hookConfig: DragConfig = {
    ...defaultConfig,
    ...config,
  };

  /**
   * Setup drag options when starting drag action.
   * @param ev React drag event.
   * @param id Dragged item id.
   */
  const handleDragStart: DragHandler = (ev, id) => {
    ev.dataTransfer.setDragImage(dragImage, 25, 25);
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData('text/plain', id);
  };

  /**
   * Show / hide drop hints on currently hovered dropzone.
   * Used in onDragEnter & onDragOver.
   * @param ev React drag event.
   * @param config Drag config.
   */
  const updateDropzoneClasses = (ev: DragEv, id: Uuid4OrEol, config: DragConfig) => {
    ev.preventDefault();

    const relativeY = getRelativeMouseY(ev);
    if (config.isContainer && relativeY >= 0.33 && relativeY < 0.67) {
      ev.currentTarget.classList.remove(config.dropAtTopCls, config.dropAtBottomCls);
      ev.currentTarget.classList.add(config.dropIntoCls);
    } else if (id === 'eol' || relativeY < 0.5) {
      ev.currentTarget.classList.remove(config.dropAtBottomCls, config.dropIntoCls);
      ev.currentTarget.classList.add(config.dropAtTopCls);
    } else {
      ev.currentTarget.classList.remove(config.dropAtTopCls, config.dropIntoCls);
      ev.currentTarget.classList.add(config.dropAtBottomCls);
    }
  };

  /**
   * Remove drop classes when leaving dropzone.
   * @param ev React drag event.
   * @param config Drag config.
   */
  const removeDropzoneClasses = (ev: DragEv, config: DragConfig) => {
    ev.currentTarget.classList.remove(
      config.dropAtTopCls,
      config.dropAtBottomCls,
      config.dropIntoCls
    );
  };

  /**
   * Actually reorder items when dropping item.
   * @param ev React drag event.
   * @param dropId Dropzone item id.
   * @param config Drag config.
   */
  const handleDrop = (ev: DragEv, dropId: Uuid4OrEol, config: DragConfig) => {
    const dragId = ev.dataTransfer.getData('text') as Uuid4;
    removeDropzoneClasses(ev, config);

    // dropped item on itself -> nothing to do
    if (dragId === dropId) return;

    const relativeY = getRelativeMouseY(ev);
    let reorderType: ReorderType;
    if (config.isContainer && relativeY >= 0.33 && relativeY < 0.67) reorderType = 'insertInto';
    else if (relativeY < 0.5) reorderType = 'putBefore';
    else reorderType = 'putAfter';
    onItemsReordered(dragId, dropId, reorderType);
  };

  /**
   * Utility function that creates all necessary handlers for a list element to be orderable.
   * @example <li {...getHandlers('item-1')}>I am draggable</li>
   * @param id unique item id. Will be used for {@link onItemsReordered}.
   * @param config Drag config.
   * @returns object of handlers applicable to a JSX element.
   */
  const getHandlers = (id: Uuid4OrEol, config?: Partial<DragConfig>): ReorderHandlers => {
    const elConfig = { ...hookConfig, ...config };

    return {
      onDragStart: (ev: DragEv) => handleDragStart(ev, id),
      onDragEnter: (ev: DragEv) => updateDropzoneClasses(ev, id, elConfig),
      onDragOver: (ev: DragEv) => updateDropzoneClasses(ev, id, elConfig),
      onDragLeave: (ev: DragEv) => removeDropzoneClasses(ev, elConfig),
      onDrop: (ev: DragEv) => handleDrop(ev, id, elConfig),
      draggable: true,
    };
  };

  return { getHandlers };
};

/**
 * Get the mouse position relative to the element.
 * If the mouse is at the top edge of the element this returns 0,
 * if it's at the bottom edge this returns 1.
 * @param ev Drag event containing information about the mouse and the target.
 * @returns a number between 0 and 1
 */
const getRelativeMouseY = (ev: DragEv) => {
  const rect = ev.currentTarget.getBoundingClientRect();
  const y = ev.clientY - rect.top; // y position withing the element
  return y / rect.height;
};
