import { ComponentPropsWithoutRef } from 'react';
import { cx } from '../modules/util';

export const ReorderButton: React.FC<ComponentPropsWithoutRef<'button'>> = (props) => {
  return (
    <button
      {...props}
      className={cx(
        props.className,
        'fa fa-grip-lines z-10 -ml-3 -mr-1 flex h-4 w-4 flex-none items-center justify-center rounded-sm text-xs text-neutral-400 opacity-40 transition-colors hover:bg-neutral-100 hover:opacity-100 active:transform-none active:bg-neutral-200'
      )}
    />
  );
};
