import { HTMLProps } from 'react';
import { cx } from '../modules/util';

export const InputLabel: React.FC<HTMLProps<HTMLLabelElement>> = (props) => (
  <label {...props} className={cx('text-sm text-neutral-500', props.className)} />
);
