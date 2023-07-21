import { useBlockWysiwygProps } from '../../hooks/useBlockWysiwygProps';
import { Block } from '../../types/Block';
import { BlockDataImage } from '../../types/BlockDataImage';

interface ImageWysiwygProps {
  block: Block<BlockDataImage>;
}

export const ImageWysiwyg: React.FC<ImageWysiwygProps> = ({ block }) => {
  const blockProps = useBlockWysiwygProps(block);
  return <img {...blockProps} src={block.data?.src} alt={block.content || '<Empty image>'} />;
};
