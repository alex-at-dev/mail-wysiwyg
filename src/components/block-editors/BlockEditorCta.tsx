import { FocusEvent } from 'react';
import { useEditorContext } from '../../context/useEditorContext';
import { BlockDataCta } from '../../types/BlockDataCta';
import { Textbox } from '../Textbox';

export const BlockEditorCta: React.FC = () => {
  const { selectedBlockId, byId, updateBlock } = useEditorContext<BlockDataCta>();
  const selectedBlock = byId(selectedBlockId);
  if (!selectedBlock?.node) return null;

  const handleContentBlur = (ev: FocusEvent<HTMLInputElement>) => {
    updateBlock({ ...selectedBlock.node, content: ev.target.value });
  };

  const handleHrefBlur = (ev: FocusEvent<HTMLInputElement>) => {
    updateBlock({ ...selectedBlock.node, data: { href: ev.target.value } });
  };

  return (
    <div key={selectedBlockId}>
      <Textbox
        label="button text"
        defaultValue={selectedBlock.node.content}
        onBlur={handleContentBlur}
      />
      <Textbox
        className="mt-4"
        label="button click url (href attribute)"
        defaultValue={selectedBlock.node.data?.href}
        onBlur={handleHrefBlur}
      />
    </div>
  );
};
