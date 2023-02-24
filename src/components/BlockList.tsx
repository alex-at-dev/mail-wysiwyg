import { useMailContext } from '../context/mailContext';
import { BlockListItem } from './BlockListItem';
import { EmptyState } from './EmptyState';

export const BlockList: React.FC = () => {
  const { root } = useMailContext();

  if (!root.children || root.children.length === 0) return <EmptyState>No blocks</EmptyState>;

  return (
    <ul>
      {root.children.map((b) => (
        <BlockListItem block={b} />
      ))}
    </ul>
  );
};
