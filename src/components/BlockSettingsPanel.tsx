import { HTMLProps } from 'react';
import { useEditorContext } from '../context/editorContext';
import { cx } from '../modules/util';
import { BlockEditorCta } from './block-editors/BlockEditorCta';
import { BlockEditorHeadline } from './block-editors/BlockEditorHeadline';
import { BlockEditorImage } from './block-editors/BlockEditorImage';
import { BlockEditorParagraph } from './block-editors/BlockEditorParagraph';
import { BlockEditorRow } from './block-editors/BlockEditorRow';

export const BlockSettingsPanel: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { selectedBlockId, byId, removeBlock } = useEditorContext();
  const selectedBlock = byId(selectedBlockId)?.node;
  if (!selectedBlock) return null;

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

      {/* block editors */}
      {selectedBlock.type === 'row' && <BlockEditorRow />}
      {selectedBlock.type === 'headline' && <BlockEditorHeadline />}
      {selectedBlock.type === 'paragraph' && <BlockEditorParagraph />}
      {selectedBlock.type === 'cta' && <BlockEditorCta />}
      {selectedBlock.type === 'image' && <BlockEditorImage />}
    </div>
  );
};
