import { HTMLProps } from 'react';
import { cx } from '../modules/util';

interface SettingsButtonProps extends HTMLProps<HTMLButtonElement> {
  label: string;
  description?: string;
  icon?: string;
  type?: any;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  label,
  description,
  icon,
  ...props
}) => {
  return (
    <button
      className="flex w-full gap-3 px-4 py-2 text-left hover:bg-neutral-50"
      type="button"
      {...props}
    >
      {icon && <i className={cx('fa mt-[.3rem] text-sm text-neutral-700', icon)} />}
      <div>
        <div>{label}</div>
        {description && <div className="text-neutral-500">{description}</div>}
      </div>
    </button>
  );
};
