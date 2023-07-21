import { useBlockWysiwygProps } from '../../hooks/useBlockWysiwygProps';
import { Block } from '../../types/Block';

interface ParagraphWysiwygProps {
  block: Block;
}
export const ParagraphWysiwyg: React.FC<ParagraphWysiwygProps> = ({ block }) => {
  const blockProps = useBlockWysiwygProps(block);
  return <p {...blockProps}>{block.content}</p>;
};
