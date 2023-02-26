import { HTMLProps } from 'react';
import { useEditorContext } from '../context/editorContext';
import { BlockType } from '../types/BlockType';
import { typeToIcon } from './BlockIcon';
import { SettingsButton } from './SettingsButton';

export const EditActionsPanel: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { root, selectedBlockId, createBlock, addBlock, getParentThat } = useEditorContext();

  const handleAddBlockClick = (type: BlockType) => {
    const block = createBlock({ type });

    // use selected block as parent if it's a row
    let parentId: string | null = root.id;
    if (selectedBlockId) {
      const parent = getParentThat((b) => b.type === 'row', selectedBlockId);
      if (parent) parentId = parent.id;
    }
    addBlock(block, parentId);
  };

  return (
    <div {...props}>
      <h2 className="uppercase-list-title mx-4 mb-1">Add Block</h2>
      <div>
        <SettingsButton
          icon={typeToIcon['row']}
          label="Row"
          description="Your basic layout building block"
          onClick={() => handleAddBlockClick('row')}
        />
        <SettingsButton
          icon={typeToIcon['headline']}
          label="Headline"
          description="h1-h6 headline"
          onClick={() => handleAddBlockClick('headline')}
        />
        <SettingsButton
          icon={typeToIcon['paragraph']}
          label="Text"
          description="Add some basic text"
          onClick={() => handleAddBlockClick('paragraph')}
        />
        <SettingsButton
          icon={typeToIcon['cta']}
          label="CTA Button"
          description="Call to action button"
          onClick={() => handleAddBlockClick('cta')}
        />
        <SettingsButton
          icon={typeToIcon['image']}
          label="Image"
          description="Enrich your mails with images"
          onClick={() => handleAddBlockClick('image')}
        />
      </div>

      <h2 className="uppercase-list-title mx-4 mb-1 mt-6">Settings</h2>
      <div>
        <SettingsButton
          icon="fa-grip-lines"
          label="Reorder blocks"
          description="Change the order of elements in the mail"
        />
        <SettingsButton icon="fa-heading" label="Edit Theme" description="Edit style settings" />
      </div>
    </div>
  );
};
