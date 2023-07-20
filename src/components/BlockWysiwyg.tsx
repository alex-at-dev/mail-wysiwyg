import React, { MouseEvent } from 'react';
import { useEditorContext } from '../hooks/useEditorContext';
import { useThemeContext } from '../hooks/useThemeContext';
import { cx } from '../modules/util';
import { Block } from '../types/Block';
import { BlockDataCta } from '../types/BlockDataCta';
import { BlockDataHeadline } from '../types/BlockDataHeadline';
import { BlockDataImage } from '../types/BlockDataImage';
import { BlockDataRow } from '../types/BlockDataRow';
import { EmptyState } from './EmptyState';

interface BlockWysiwygProps {
  block: Block;
}

export const BlockWysiwyg: React.FC<BlockWysiwygProps> = ({ block }) => {
  const { getBlockStyle } = useThemeContext();
  const { selectedBlockId, setSelectedBlockId, hoveredBlockId, setHoveredBlockId } =
    useEditorContext();

  const blockProps = {
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

  switch (block.type) {
    case 'root':
      if (!block.children) return null;
      return (
        <>
          {block.children.map((c) => (
            <BlockWysiwyg key={c.id} block={c} />
          ))}
        </>
      );
    case 'row':
      const blockRow = block as Block<BlockDataRow>;
      if (!blockRow.children?.length || !blockRow.data) return null;
      if (blockRow.data.direction === 'row') {
        return (
          <table width="100%" {...blockProps}>
            <tbody>
              <tr>
                {blockRow.children.map((b) => (
                  <td key={b.id}>
                    <BlockWysiwyg block={b} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        );
      } else {
        return (
          <div {...blockProps}>
            {blockRow.children.map((b) => (
              <div key={b.id}>
                <BlockWysiwyg block={b} />
              </div>
            ))}
          </div>
        );
      }
    case 'headline':
      const blockHeadline = block as Block<BlockDataHeadline>;
      if (!blockHeadline.data) return null;
      const tagname = 'h' + blockHeadline.data.level;
      return React.createElement(tagname, blockProps, block.content);
    case 'paragraph':
      return <p {...blockProps}>{block.content}</p>;
    case 'cta':
      const blockCta = block as Block<BlockDataCta>;
      return (
        <a
          {...blockProps}
          className={cx(blockProps.className, 'rounded-full bg-orange-600 px-2 py-1 text-white')}
          href={blockCta.data?.href}
        >
          {blockCta.content}
        </a>
      );
    case 'image':
      const blockImage = block as Block<BlockDataImage>;
      if (!blockImage.data) return null;
      return (
        <div {...blockProps}>
          <img src={blockImage.data.src} alt={block.content} />
        </div>
      );
  }

  return (
    <EmptyState>
      No block editor found for
      <pre>{JSON.stringify(block, null, 2)}</pre>
    </EmptyState>
  );
};
