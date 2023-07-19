import { HTMLProps } from 'react';
import { useEditorContext } from '../hooks/useEditorContext';
import { BlockType } from '../types/BlockType';
import { typeToIcon } from '../util/typeToIcon';
import { SettingsButton } from './SettingsButton';

export const AddBlockList: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { root, selectedBlockId, createBlock, addBlock, getParentThat } = useEditorContext();

  const handleAddBlockClick = <T extends {}>(type: BlockType, data?: T) => {
    const block = createBlock({ type, style: {}, data });

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
      <SettingsButton
        icon={typeToIcon['row']}
        label="Row"
        description="Your basic layout building block"
        onClick={() => handleAddBlockClick('row', { direction: 'row' })}
      />
      <SettingsButton
        icon={typeToIcon['headline']}
        label="Headline"
        description="h1-h4 headline"
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
  );
};
