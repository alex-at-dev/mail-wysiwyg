import Markdown from 'markdown-to-jsx';
import { useBlockWysiwygProps } from '../../hooks/useBlockWysiwygProps';
import { Block } from '../../types/Block';

interface ParagraphWysiwygProps {
  block: Block;
}
export const ParagraphWysiwyg: React.FC<ParagraphWysiwygProps> = ({ block }) => {
  const blockProps = useBlockWysiwygProps(block);
  if (!block.content) return null;

  return <Markdown {...blockProps}>{block.content}</Markdown>;
};
