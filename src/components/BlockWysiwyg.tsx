import React from 'react';
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
      if (blockRow.data.direction === 'row')
        return (
          <table width="100">
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
      else {
        return (
          <div>
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
      return React.createElement(tagname, {}, block.content);
    case 'paragraph':
      return <p>{block.content}</p>;
    case 'cta':
      const blockCta = block as Block<BlockDataCta>;
      return (
        <a className="rounded-full bg-orange-600 px-2 py-1 text-white" href={blockCta.data?.href}>
          {blockCta.content}
        </a>
      );
    case 'image':
      const blockImage = block as Block<BlockDataImage>;
      if (!blockImage.data) return null;
      return (
        <div>
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
