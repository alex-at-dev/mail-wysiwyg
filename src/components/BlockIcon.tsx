import { HTMLProps } from 'react';
import { cx } from '../modules/util';
import { BlockType } from '../types/BlockType';

export const typeToIcon: { [type in BlockType]: string } = {
  root: 'fa-circle',
  row: 'fa-bars-staggered',
  headline: 'fa-heading',
  paragraph: 'fa-paragraph',
  cta: 'fa-link',
  image: 'fa-image',
};

interface BlockIconProps extends HTMLProps<HTMLSpanElement> {
  type: BlockType;
}
export const BlockIcon: React.FC<BlockIconProps> = ({ type, ...props }) => {
  return (
    <i
      {...props}
      className={cx(props.className, typeToIcon[type], 'fa text-sm text-neutral-700')}
    />
  );
};
