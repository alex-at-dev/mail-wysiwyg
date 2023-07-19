import { HTMLProps } from 'react';
import { cx } from '../modules/util';

export const PropertyInput: React.FC<HTMLProps<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={cx(
      props.className,
      'inline-block min-w-0 max-w-full rounded-sm border border-transparent p-1 text-sm hover:border-neutral-300 focus:border-neutral-600'
    )}
  />
);
