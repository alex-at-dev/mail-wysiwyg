import { FocusEvent } from 'react';
import { useEditorContext } from '../../context/useEditorContext';
import { Textbox } from '../Textbox';

export const BlockEditorHeadline: React.FC = () => {
  const { byId, selectedBlockId, updateBlock } = useEditorContext();
  const selectedBlock = byId(selectedBlockId);
  if (!selectedBlock?.node) return null;

  const handleContentBlur = (ev: FocusEvent<HTMLInputElement>) => {
    updateBlock({ ...selectedBlock.node, content: ev.target.value });
  };

  return (
    <Textbox
      label="headline"
      defaultValue={selectedBlock.node.content}
      onBlur={handleContentBlur}
    />
  );
};
