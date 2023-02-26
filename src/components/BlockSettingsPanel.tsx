import { FocusEvent, HTMLProps } from 'react';
import { useEditorContext } from '../context/editorContext';
import { cx } from '../modules/util';
import { AddBlockList } from './AddBlockList';
import { Textarea } from './Textarea';
import { Textbox } from './Textbox';

export const BlockSettingsPanel: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { selectedBlockId, byId, updateBlock, removeBlock } = useEditorContext();
  if (!selectedBlockId) return null;
  const selectedBlock = byId(selectedBlockId)?.node;
  if (!selectedBlock) return null;

  const handleContentBlur = (ev: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateBlock({ ...selectedBlock, content: ev.target.value });
  };

  return (
    <div {...props} className={cx(props.className, 'px-4')}>
      <h2 className="uppercase-list-title mb-3">Block settings</h2>

      {/* delete button */}
      <button
        className="mb-4 bg-red-200 px-2 py-1 text-xs text-red-800"
        onClick={() => removeBlock(selectedBlockId)}
      >
        delete node
      </button>

      {/* row */}
      {selectedBlock.type === 'row' && <AddBlockList className="-mx-4 -mt-2" />}

      {/* headline */}
      {selectedBlock.type === 'headline' && (
        <Textbox label="headline" defaultValue={selectedBlock.content} onBlur={handleContentBlur} />
      )}

      {/* paragraph */}
      {selectedBlock.type === 'paragraph' && (
        <Textarea
          label="content (supports markdown)"
          defaultValue={selectedBlock.content}
          onBlur={handleContentBlur}
        />
      )}
    </div>
  );
};
