import { MouseEvent } from 'react';
import { typeToIcon } from '../components/BlockIcon';
import { BlockList } from '../components/BlockList';
import { EmptyState } from '../components/EmptyState';
import { SettingsButton } from '../components/SettingsButton';
import { useEditorContext } from '../context/editorContext';
import { BlockType } from '../types/BlockType';

export const MailEditPage: React.FC = () => {
  const { root, selectedBlockId, setSelectedBlockId, createBlock, addBlock, getParentThat } =
    useEditorContext();

  const handleBlockListClick = (ev: MouseEvent) => {
    if (ev.target !== ev.currentTarget) return;
    setSelectedBlockId(null);
  };

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
    <div className="grid min-h-[100vh] grid-cols-[18rem,1fr,18rem] justify-between">
      {/* blocks */}
      <div className="border-r" onClick={handleBlockListClick}>
        <h2 className="uppercase-list-title mx-4 mb-3 mt-4">Blocks</h2>
        {root.children && <BlockList blocks={root.children} />}
      </div>

      {/* main page */}
      <div className="grow overflow-auto bg-neutral-100">
        <div className="mx-auto my-8 w-[800px] bg-white shadow-page">
          {!root.children ? (
            <EmptyState className="px-6 py-6">
              You will see a preview of the generated mail here once you add your first block from
              the right.
            </EmptyState>
          ) : (
            <pre>{JSON.stringify(root, null, 2)}</pre>
          )}
        </div>
      </div>

      {/* settings & actions */}
      <div className="border-l py-4">
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
    </div>
  );
};
