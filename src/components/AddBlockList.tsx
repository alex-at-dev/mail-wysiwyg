import { ComponentPropsWithoutRef } from 'react';
import { useEditorContext } from '../hooks/useEditorContext';
import { BlockType } from '../types/BlockType';
import { typeToIcon } from '../util/typeToIcon';
import { SettingsButton } from './SettingsButton';

export const AddBlockList: React.FC<ComponentPropsWithoutRef<'div'>> = (props) => {
  const { root, selectedBlockId, createBlock, addBlock, getParentThat } = useEditorContext();

  const handleAddBlockClick = <T extends {}>(type: BlockType, data?: T) => {
    const block = createBlock({ type, style: {}, data });

    // use selected block as parent if it's a row
    let parent = root;
    let index: number | undefined = undefined;
    if (selectedBlockId) {
      parent = getParentThat((b) => b.type === 'row', selectedBlockId) ?? root;
      index = parent.children?.findIndex((b) => b.id === selectedBlockId);
      if (index !== undefined && index > -1) index++;
    }
    addBlock(block, parent.id, index);
  };

  return (
    <div {...props}>
      <h2 className="uppercase-list-title mx-4 mb-1">Add Block</h2>
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
        onClick={() => handleAddBlockClick('headline', { level: 1 })}
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
