import { ComponentPropsWithoutRef, FocusEvent, KeyboardEvent, useState } from 'react';
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
  const { selectedBlockId, setSelectedBlockId, updateBlock } = useEditorContext();
  const [editingLabel, setEditingLabel] = useState(false);

  const handleLabelEditBlur = (ev: FocusEvent<HTMLInputElement>) => {
    setEditingLabel(false);
    let label: string | undefined = ev.target.value;
    if (label === '') label = undefined;
    else if (block.content) {
      if (label === block.content) label = undefined;
    } else if (label === defaultLayerName[block.type]) label = undefined;

    updateBlock({ ...block, label });
  };

  const handleLabelEditKeydown = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Escape') setEditingLabel(false);
    else if (ev.key === 'Enter') handleLabelEditBlur(ev as any); // we just need ev.target.value in blur handler
  };

  const labelEditRef = (el: HTMLInputElement) => {
    el?.focus();
    el?.select();
  };

  const isSelectedBlock = selectedBlockId === block.id;
  const label = block.label || block.content || defaultLayerName[block.type];
  return (
    <li>
      <button
        {...props}
        onClick={() => setSelectedBlockId(block.id)}
        onDoubleClick={() => setEditingLabel(true)}
        className={cx(
          `flex w-full items-center gap-2 py-2 pr-4 text-left hover:outline hover:outline-neutral-300`,
          props.className,
          { 'bg-neutral-100': isSelectedBlock }
        )}
        style={{ paddingLeft: `${(1 + level) * 1.5}rem` }}
      >
        <BlockIcon type={block.type} />
        {editingLabel ? (
          <input
            defaultValue={label}
            onBlur={handleLabelEditBlur}
            ref={labelEditRef}
            onKeyDown={handleLabelEditKeydown}
          />
        ) : (
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">{label}</div>
        )}
      </button>
      {block.children && <BlockList blocks={block.children} level={level + 1} />}
    </li>
  );
};
