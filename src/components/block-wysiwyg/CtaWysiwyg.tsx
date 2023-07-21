import { useBlockWysiwygProps } from '../../hooks/useBlockWysiwygProps';
import { cx } from '../../modules/util';
import { Block } from '../../types/Block';
import { BlockDataCta } from '../../types/BlockDataCta';

interface CtaWysiwygProps {
  block: Block<BlockDataCta>;
}

export const CtaWysiwyg: React.FC<CtaWysiwygProps> = ({ block }) => {
  const blockProps = useBlockWysiwygProps(block);
  return (
    <a
      {...blockProps}
      className={cx(blockProps.className, 'rounded-full bg-orange-600 px-2 py-1 text-white')}
      href={block.data?.href}
    >
      {block.content}
    </a>
  );
};
