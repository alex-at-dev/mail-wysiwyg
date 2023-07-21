import { FocusEvent } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import { AddBlockList } from '../AddBlockList';
import { StyleEditor } from '../StyleEditor';
import { Textarea } from '../Textarea';

export const BlockEditorParagraph: React.FC = () => {
  const { byId, selectedBlockId, updateBlock } = useEditorContext();
  const selectedBlock = byId(selectedBlockId);
  if (!selectedBlock?.node) return null;

  const handleContentBlur = (ev: FocusEvent<HTMLTextAreaElement>) => {
    updateBlock({ ...selectedBlock.node, content: ev.target.value });
  };

  return (
    <div>
      <Textarea
        key={selectedBlockId}
        rows={6}
        label="content (supports markdown)"
        defaultValue={selectedBlock.node.content}
        onBlur={handleContentBlur}
      />
      <StyleEditor className="mt-6" />
      <AddBlockList className="-mx-4 mt-4" />
    </div>
  );
};
