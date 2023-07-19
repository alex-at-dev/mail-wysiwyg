import { ComponentPropsWithoutRef } from 'react';
import { cx } from '../modules/util';

export const PropertyButton: React.FC<ComponentPropsWithoutRef<'button'>> = (props) => {
  // smaller text size for icon-only buttons
  const textSize = props.children ? 'text-sm' : 'text-xs';
  return (
    <button
      {...props}
      className={cx(
        props.className,
        textSize,
        'flex-none rounded-sm px-2 py-[.35rem] transition-colors hover:bg-neutral-100 active:bg-neutral-200 active:transition-none'
      )}
    />
  );
};
