import { MouseEvent } from 'react';
import { BlockList } from '../components/BlockList';
import { BlockSettingsPanel } from '../components/BlockSettingsPanel';
import { BlockWysiwyg } from '../components/BlockWysiwyg';
import { EmptyState } from '../components/EmptyState';
import { GeneralSettingsPanel } from '../components/GeneralSettingsPanel';
import { ResizableContainer } from '../components/ResizableContainer';
import { useEditorContext } from '../hooks/useEditorContext';
import { useReorderList } from '../hooks/useReorderList';
import { EOL } from '../modules/tree';
import { cx } from '../modules/util';

export const MailEditPage: React.FC = () => {
  const { root, selectedBlockId, setSelectedBlockId, reorderBlocks } = useEditorContext();
  const { getHandlers } = useReorderList(reorderBlocks);

  const handleUnselectBlock = (ev: MouseEvent) => {
    if (ev.target !== ev.currentTarget) return;
    setSelectedBlockId(null);
  };

  return (
    <div className="flex">
      {/* blocks */}
      <ResizableContainer
        side="right"
        className="flex h-screen w-80 min-w-[8rem] max-w-md flex-none flex-col overflow-y-auto overflow-x-hidden border-r bg-white"
        onClick={handleUnselectBlock}
      >
        <h2 className="uppercase-list-title mx-4 mb-3 mt-4">Blocks</h2>
        {root.children && <BlockList blocks={root.children} />}
        <div
          {...getHandlers(EOL)}
          className="min-h-[2rem] grow overflow-hidden pl-6"
          onClick={handleUnselectBlock}
        />
      </ResizableContainer>

      {/* main page */}
      <div onClick={handleUnselectBlock} className="h-screen flex-1 overflow-auto">
        <div className="mx-auto my-8 w-[800px] shadow-page" onClick={handleUnselectBlock}>
          {!root.children ? (
            <EmptyState className="px-6 py-6">
              You will see a preview of the generated mail here once you add your first block from
              the right.
            </EmptyState>
          ) : (
            <>
              <BlockWysiwyg block={root} />
              <pre>{JSON.stringify(root, null, 2)}</pre>
            </>
          )}
        </div>
      </div>

      {/* settings & actions */}
      <ResizableContainer
        side="left"
        className="h-screen w-80 min-w-[16rem] max-w-sm flex-none overflow-y-auto overflow-x-hidden border-l bg-white py-4"
      >
        <GeneralSettingsPanel className={cx({ hidden: !!selectedBlockId })} />
        <BlockSettingsPanel className={cx({ hidden: !selectedBlockId })} />
      </ResizableContainer>
    </div>
  );
};
