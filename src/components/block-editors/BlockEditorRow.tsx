import { ChangeEvent } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import { BlockDataRow } from '../../types/BlockDataRow';
import { AddBlockList } from '../AddBlockList';
import { SegmentedButtonRadio } from '../SegmentedButtonRadio';
import { StyleEditor } from '../StyleEditor';

export const BlockEditorRow: React.FC = () => {
  const { byId, selectedBlockId, updateBlock } = useEditorContext<BlockDataRow>();
  const selectedBlock = byId(selectedBlockId);
  if (!selectedBlock?.node) return null;

  const handleDirectionChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value !== 'row' && ev.target.value !== 'col') return;
    updateBlock({ ...selectedBlock.node, data: { direction: ev.target.value } });
  };

  return (
    <div key={selectedBlockId}>
      <SegmentedButtonRadio
        name="direction"
        label="Row direction"
        options={[
          { value: 'row', label: 'Row' },
          { value: 'col', label: 'Column' },
        ]}
        onChange={handleDirectionChange}
        initialValue={selectedBlock.node.data?.direction}
      />

      <StyleEditor hiddenEditors={['color', 'font']} className="mt-6" />
      <AddBlockList className="-mx-4 mt-4" />
    </div>
  );
};
