import { useEditorContext } from '../context/editorContext';
import { useReorderList } from '../hooks/useReorderList';
import { Block } from '../types/Block';
import { BlockListItem } from './BlockListItem';

interface BlockListProps {
  blocks: Block[];
  level?: number;
}

export const BlockList: React.FC<BlockListProps> = ({ blocks, level = 0 }) => {
  const { reorderBlocks } = useEditorContext();
  const { getHandlers } = useReorderList(reorderBlocks);

  return (
    <ul>
      {blocks.map((b) => (
        <BlockListItem
          key={b.id}
          block={b}
          level={level}
          {...getHandlers(b.id, { isContainer: b.type === 'row' })}
        />
      ))}
    </ul>
  );
};
