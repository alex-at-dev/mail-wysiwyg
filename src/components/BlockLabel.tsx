import { FocusEvent, KeyboardEvent } from 'react';
import { useEditorContext } from '../hooks/useEditorContext';
import { Block } from '../types/Block';
import { BlockType } from '../types/BlockType';

const defaultLayerName: { [type in BlockType]: string } = {
  root: 'Root',
  row: 'Row',
  headline: 'Headline',
  paragraph: 'Paragraph',
  cta: 'Button',
  image: 'Image',
};

interface BlockLabelProps {
  block: Block;
  isEditable: boolean;
  setIsEditable: (state: boolean) => void;
}

export const BlockLabel: React.FC<BlockLabelProps> = ({ block, isEditable, setIsEditable }) => {
  const { updateBlock } = useEditorContext();

  const handleLabelEditBlur = (ev: FocusEvent<HTMLInputElement>) => {
    setIsEditable(false);
    let label: string | undefined = ev.target.value;
    if (label === '') label = undefined;
    else if (block.content) {
      if (label === block.content) label = undefined;
    } else if (label === defaultLayerName[block.type]) label = undefined;

    updateBlock({ ...block, label });
  };

  const handleLabelEditKeydown = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Escape') setIsEditable(false);
    else if (ev.key === 'Enter') handleLabelEditBlur(ev as any); // we just need ev.target.value in blur handler
  };

  const labelEditRef = (el: HTMLInputElement) => {
    el?.focus();
    el?.select();
  };

  const label = block.label || block.content || defaultLayerName[block.type];

  if (isEditable) {
    return (
      <input
        className="block w-full"
        defaultValue={label}
        onBlur={handleLabelEditBlur}
        ref={labelEditRef}
        onKeyDown={handleLabelEditKeydown}
      />
    );
  }
  return <div className="overflow-hidden text-ellipsis whitespace-nowrap">{label}</div>;
};
