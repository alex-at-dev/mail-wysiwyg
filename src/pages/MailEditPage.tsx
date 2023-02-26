import { MouseEvent } from 'react';
import { BlockList } from '../components/BlockList';
import { BlockSettingsPanel } from '../components/BlockSettingsPanel';
import { EditActionsPanel } from '../components/EditActionsPanel';
import { EmptyState } from '../components/EmptyState';
import { useEditorContext } from '../context/editorContext';
import { cx } from '../modules/util';

export const MailEditPage: React.FC = () => {
  const { root, selectedBlockId, setSelectedBlockId } = useEditorContext();

  const handleUnselectBlock = (ev: MouseEvent) => {
    if (ev.target !== ev.currentTarget) return;
    setSelectedBlockId(null);
  };

  return (
    <div className="grid min-h-[100vh] grid-cols-[18rem,1fr,18rem] justify-between">
      {/* blocks */}
      <div className="border-r" onClick={handleUnselectBlock}>
        <h2 className="uppercase-list-title mx-4 mb-3 mt-4">Blocks</h2>
        {root.children && <BlockList blocks={root.children} />}
      </div>

      {/* main page */}
      <div className="grow overflow-auto bg-neutral-100" onClick={handleUnselectBlock}>
        <div className="mx-auto my-8 w-[800px] bg-white shadow-page" onClick={handleUnselectBlock}>
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
        <EditActionsPanel className={cx({ hidden: !!selectedBlockId })} />
        <BlockSettingsPanel className={cx({ hidden: !selectedBlockId })} />
      </div>
    </div>
  );
};
