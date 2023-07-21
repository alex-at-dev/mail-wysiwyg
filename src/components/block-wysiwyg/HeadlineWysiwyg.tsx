import React from 'react';
import { useBlockWysiwygProps } from '../../hooks/useBlockWysiwygProps';
import { Block } from '../../types/Block';
import { BlockDataHeadline } from '../../types/BlockDataHeadline';

interface HeadlineWysiwygProps {
  block: Block<BlockDataHeadline>;
}

export const HeadlineWysiwyg: React.FC<HeadlineWysiwygProps> = ({ block }) => {
  const blockProps = useBlockWysiwygProps(block);
  if (!block.data) return null;
  const tagname = 'h' + block.data.level;
  return React.createElement(tagname, blockProps, block.content || '<Empty headline>');
};
