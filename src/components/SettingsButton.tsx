import { ComponentPropsWithoutRef } from 'react';
import { cx } from '../modules/util';

interface SettingsButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string;
  description?: string;
  icon?: string;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  label,
  description,
  icon,
  ...props
}) => {
  return (
    <button
      className="flex w-full gap-3 px-4 py-2 text-left enabled:hover:bg-neutral-50 enabled:active:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      {...props}
    >
      {icon && <i className={cx('fa mt-[.3rem] w-4 text-center text-sm text-neutral-700', icon)} />}
      <div>
        <div>{label}</div>
        {description && <div className="text-neutral-500">{description}</div>}
      </div>
    </button>
  );
};
