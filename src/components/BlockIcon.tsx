import { HTMLProps } from 'react';
import { cx } from '../modules/util';
import { BlockType } from '../types/BlockType';
import { typeToIcon } from '../util/typeToIcon';

interface BlockIconProps extends HTMLProps<HTMLSpanElement> {
  type: BlockType;
}
export const BlockIcon: React.FC<BlockIconProps> = ({ type, ...props }) => {
  return (
    <i
      {...props}
      className={cx(
        props.className,
        typeToIcon[type],
        'fa w-4 text-center text-sm text-neutral-700'
      )}
    />
  );
};
