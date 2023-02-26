import { ComponentPropsWithoutRef, useState } from 'react';
import { useEditorContext } from '../context/editorContext';
import { cx } from '../modules/util';
import { Block } from '../types/Block';
import { BlockIcon } from './BlockIcon';
import { BlockLabel } from './BlockLabel';
import { BlockList } from './BlockList';

interface BlockListItemProps extends ComponentPropsWithoutRef<'button'> {
  block: Block;
  level: number;
}

export const BlockListItem: React.FC<BlockListItemProps> = ({ block, level, ...props }) => {
  const { selectedBlockId, setSelectedBlockId } = useEditorContext();
  const [isEditable, setIsEditable] = useState(false);
  const isSelectedBlock = selectedBlockId === block.id;

  return (
    <li>
      <button
        {...props}
        onClick={() => setSelectedBlockId(block.id)}
        onDoubleClick={() => setIsEditable(true)}
        className={cx(
          `flex w-full items-center gap-2 overflow-hidden py-2 pr-4 text-left hover:outline hover:outline-neutral-300`,
          props.className,
          { 'bg-neutral-100': isSelectedBlock }
        )}
        style={{ paddingLeft: `${(1 + level) * 1.5}rem` }}
      >
        <BlockIcon type={block.type} />
        <BlockLabel block={block} isEditable={isEditable} setIsEditable={setIsEditable} />
      </button>
      {block.children && <BlockList blocks={block.children} level={level + 1} />}
    </li>
  );
};
