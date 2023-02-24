import { Block } from '../types/Block';
import { BlockType } from '../types/BlockType';
import { BlockIcon } from './BlockIcon';

interface BlockListItemProps {
  block: Block;
}

const defaultLayerName: { [type in BlockType]: string } = {
  root: 'Root',
  row: 'Row',
  headline: 'Headline',
  paragraph: 'Paragraph',
  cta: 'Button',
  image: 'Image',
};

export const BlockListItem: React.FC<BlockListItemProps> = ({ block, ...props }) => {
  return (
    <li {...props}>
      <button className="flex w-full items-center gap-2 py-2 px-4 text-left hover:bg-neutral-50">
        <BlockIcon type={block.type} />
        {block.content || defaultLayerName[block.type]}
      </button>
    </li>
  );
};
