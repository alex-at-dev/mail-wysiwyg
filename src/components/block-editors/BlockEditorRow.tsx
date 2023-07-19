import { ChangeEvent } from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import { BlockDataRow } from '../../types/BlockDataRow';
import { AddBlockList } from '../AddBlockList';
import { SegmentedButtonRadio } from '../SegmentedButtonRadio';

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

      <h2 className="uppercase-list-title mb-3 mt-6">Add Block</h2>
      <AddBlockList className="-mx-4 -mt-2" />
    </div>
  );
};
