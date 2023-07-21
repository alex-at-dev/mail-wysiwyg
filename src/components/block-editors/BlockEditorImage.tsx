import { FocusEvent } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import { BlockDataImage } from '../../types/BlockDataImage';
import { AddBlockList } from '../AddBlockList';
import { StyleEditor } from '../StyleEditor';
import { Textbox } from '../Textbox';

export const BlockEditorImage: React.FC = () => {
  const { selectedBlockId, byId, updateBlock } = useEditorContext<BlockDataImage>();
  const selectedBlock = byId(selectedBlockId);
  if (!selectedBlock?.node) return null;

  const handleSourceBlur = (ev: FocusEvent<HTMLInputElement>) => {
    updateBlock({ ...selectedBlock.node, data: { src: ev.target.value } });
  };

  const handleAltBlur = (ev: FocusEvent<HTMLInputElement>) => {
    updateBlock({ ...selectedBlock.node, content: ev.target.value });
  };

  return (
    <div key={selectedBlockId}>
      <Textbox
        label="image source ('https://...')"
        defaultValue={selectedBlock.node.data?.src}
        onBlur={handleSourceBlur}
      />
      <Textbox
        className="mt-4"
        label="alt"
        defaultValue={selectedBlock.node.content}
        onBlur={handleAltBlur}
      />

      <StyleEditor className="mt-6" hiddenEditors={['background', 'color', 'font', 'padding']} />
      <AddBlockList className="-mx-4 mt-4" />
    </div>
  );
};
