import { MouseEvent } from 'react';
import { cx } from '../modules/util';
import { Block } from '../types/Block';
import { useEditorContext } from './useEditorContext';
import { useThemeContext } from './useThemeContext';

export const useBlockWysiwygProps = (block: Block) => {
  const { getBlockStyle } = useThemeContext();
  const { selectedBlockId, setSelectedBlockId, hoveredBlockId, setHoveredBlockId } =
    useEditorContext();

  return {
    style: block.style ? getBlockStyle(block.style) : {},
    className: cx('cursor-pointer', {
      'outline outline-2 outline-blue-400': hoveredBlockId === block.id,
      'outline outline-blue-400': selectedBlockId === block.id,
    }),
    onClick: (ev: MouseEvent) => {
      ev.preventDefault(); // prevent button link navigation (<a href)
      ev.stopPropagation();
      setSelectedBlockId(block.id);
    },
    onMouseMove: (ev: MouseEvent) => {
      /* 
      TODO make selection of selected block more performant.
      This causes a rerender of the context (= maybe all blocks).
      Maybe switch to zustand or don't use mouse-move.
      */
      ev.stopPropagation();
      if (selectedBlockId !== block.id) setHoveredBlockId(block.id);
    },
  };
};
