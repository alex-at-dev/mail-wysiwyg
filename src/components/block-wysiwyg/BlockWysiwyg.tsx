import React from 'react';
import { Block } from '../../types/Block';
import { BlockDataCta } from '../../types/BlockDataCta';
import { BlockDataHeadline } from '../../types/BlockDataHeadline';
import { BlockDataImage } from '../../types/BlockDataImage';
import { BlockDataRow } from '../../types/BlockDataRow';
import { EmptyState } from '../EmptyState';
import { CtaWysiwyg } from './CtaWysiwyg';
import { HeadlineWysiwyg } from './HeadlineWysiwyg';
import { ImageWysiwyg } from './ImageWysiwyg';
import { ParagraphWysiwyg } from './ParagraphWysiwyg';
import { RowWysiwyg } from './RowWysiwyg';

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
      return <RowWysiwyg block={block as Block<BlockDataRow>} />;
    case 'headline':
      return <HeadlineWysiwyg block={block as Block<BlockDataHeadline>} />;
    case 'paragraph':
      return <ParagraphWysiwyg block={block} />;
    case 'cta':
      return <CtaWysiwyg block={block as Block<BlockDataCta>} />;
    case 'image':
      return <ImageWysiwyg block={block as Block<BlockDataImage>} />;
    default:
      return (
        <EmptyState>
          No block editor found for
          <pre>{JSON.stringify(block, null, 2)}</pre>
        </EmptyState>
      );
  }
};
