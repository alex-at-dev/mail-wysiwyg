import { FocusEvent } from 'react';
import { useEditorContext } from '../../context/useEditorContext';
import { Textarea } from '../Textarea';

export const BlockEditorParagraph: React.FC = () => {
  const { byId, selectedBlockId, updateBlock } = useEditorContext();
  const selectedBlock = byId(selectedBlockId);
  if (!selectedBlock?.node) return null;

  const handleContentBlur = (ev: FocusEvent<HTMLTextAreaElement>) => {
    updateBlock({ ...selectedBlock.node, content: ev.target.value });
  };

  return (
    <Textarea
      label="content (supports markdown)"
      defaultValue={selectedBlock.node.content}
      onBlur={handleContentBlur}
    />
  );
};
