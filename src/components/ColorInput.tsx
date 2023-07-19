import { HTMLProps, useState } from 'react';
import { cx } from '../modules/util';
import { PropertyInput } from './PropertyInput';

export const ColorInput: React.FC<HTMLProps<HTMLInputElement>> = ({ ...props }) => {
  const [id] = useState(props.id || `color-${crypto.randomUUID()}`);

  return (
    <div className="relative min-w-0">
      <label
        htmlFor={id}
        className="absolute top-1 left-1 block h-5 w-5 flex-none cursor-pointer rounded-full border border-neutral-200 bg-none"
        style={{ background: props.value?.toString() }}
      />
      <input
        tabIndex={-1}
        {...props}
        id={id}
        type="color"
        className="pointer-events-none absolute opacity-0"
      />
      <PropertyInput {...props} className={cx(props.className, 'pl-7')} />
    </div>
  );
};
