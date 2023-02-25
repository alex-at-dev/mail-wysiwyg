import { Block } from '../types/Block';
import { BlockListItem } from './BlockListItem';

interface BlockListProps {
  blocks: Block[];
  level?: number;
}

export const BlockList: React.FC<BlockListProps> = ({ blocks, level = 0 }) => {
  return (
    <ul>
      {blocks.map((b) => (
        <BlockListItem key={b.id} block={b} level={level} />
      ))}
    </ul>
  );
};
