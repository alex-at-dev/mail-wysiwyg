import { HTMLProps } from 'react';
import { cx } from '../modules/util';

export const EmptyState: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  return <div {...props} className={cx(props.className, 'italic text-neutral-400')} />;
};
