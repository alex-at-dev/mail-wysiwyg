import { FocusEvent } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import { BlockDataHeadline } from '../../types/BlockDataHeadline';
import { SegmentedButtonRadio } from '../SegmentedButtonRadio';
import { Textarea } from '../Textarea';

export const BlockEditorHeadline: React.FC = () => {
  const { byId, selectedBlockId, updateBlock } = useEditorContext<BlockDataHeadline>();
  const selectedBlock = byId(selectedBlockId);
  if (!selectedBlock?.node) return null;

  const handleLevelChange = (ev: FocusEvent<HTMLInputElement>) => {
    const parsed = parseInt(ev.target.value);
    if (isNaN(parsed) || (parsed !== 1 && parsed !== 2 && parsed !== 3 && parsed !== 4)) return;
    updateBlock({ ...selectedBlock.node, data: { level: parsed } });
  };

  const handleContentBlur = (ev: FocusEvent<HTMLTextAreaElement>) => {
    updateBlock({ ...selectedBlock.node, content: ev.target.value });
  };

  return (
    <div key={selectedBlockId}>
      <SegmentedButtonRadio
        name="headline-level"
        label="Level"
        options={[
          { value: 1, label: 'h1' },
          { value: 2, label: 'h2' },
          { value: 3, label: 'h3' },
          { value: 4, label: 'h4' },
        ]}
        initialValue={selectedBlock.node.data?.level}
        onChange={handleLevelChange}
      />
      <Textarea
        className="mt-6"
        label="headline"
        defaultValue={selectedBlock.node.content}
        onBlur={handleContentBlur}
      />
    </div>
  );
};
