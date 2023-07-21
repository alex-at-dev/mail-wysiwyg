import { useBlockWysiwygProps } from '../../hooks/useBlockWysiwygProps';
import { Block } from '../../types/Block';
import { BlockDataRow } from '../../types/BlockDataRow';
import { BlockWysiwyg } from './BlockWysiwyg';

interface RowWysiwygProps {
  block: Block<BlockDataRow>;
}

export const RowWysiwyg: React.FC<RowWysiwygProps> = ({ block }) => {
  const blockProps = useBlockWysiwygProps(block);
  if (!block.children?.length || !block.data) return null;
  if (block.data.direction === 'row') {
    return (
      <table width="100%" {...blockProps}>
        <tbody>
          <tr>
            {block.children.map((b) => (
              <td key={b.id}>
                <BlockWysiwyg block={b} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  } else {
    return (
      <div {...blockProps}>
        {block.children.map((b) => (
          <div key={b.id}>
            <BlockWysiwyg block={b} />
          </div>
        ))}
      </div>
    );
  }
};
