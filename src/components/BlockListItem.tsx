import { ComponentPropsWithoutRef } from 'react';
import { useEditorContext } from '../context/editorContext';
import { cx } from '../modules/util';
import { Block } from '../types/Block';
import { BlockType } from '../types/BlockType';
import { BlockIcon } from './BlockIcon';
import { BlockList } from './BlockList';

interface BlockListItemProps extends ComponentPropsWithoutRef<'button'> {
  block: Block;
  level: number;
}

const defaultLayerName: { [type in BlockType]: string } = {
  root: 'Root',
  row: 'Row',
  headline: 'Headline',
  paragraph: 'Paragraph',
  cta: 'Button',
  image: 'Image',
};

export const BlockListItem: React.FC<BlockListItemProps> = ({ block, level, ...props }) => {
  const { selectedBlockId, setSelectedBlockId } = useEditorContext();

  const isSelectedBlock = selectedBlockId === block.id;
  return (
    <li>
      <button
        {...props}
        onClick={() => setSelectedBlockId(block.id)}
        className={cx(
          `flex w-full items-center gap-2 py-2 pr-4 text-left hover:outline hover:outline-neutral-300`,
          props.className,
          { 'bg-neutral-100': isSelectedBlock }
        )}
        style={{ paddingLeft: `${(1 + level) * 1.5}rem` }}
      >
        <BlockIcon type={block.type} />
        {block.content || defaultLayerName[block.type]}
      </button>
      {block.children && <BlockList blocks={block.children} level={level + 1} />}
    </li>
  );
};
