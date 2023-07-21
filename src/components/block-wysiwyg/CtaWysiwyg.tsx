import { useBlockWysiwygProps } from '../../hooks/useBlockWysiwygProps';
import { Block } from '../../types/Block';
import { BlockDataCta } from '../../types/BlockDataCta';

interface CtaWysiwygProps {
  block: Block<BlockDataCta>;
}

export const CtaWysiwyg: React.FC<CtaWysiwygProps> = ({ block }) => {
  const blockProps = useBlockWysiwygProps(block);
  return (
    <a {...blockProps} href={block.data?.href}>
      {block.content || '<Empty cta>'}
    </a>
  );
};
