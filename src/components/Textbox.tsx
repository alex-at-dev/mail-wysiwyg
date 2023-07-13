import { HTMLProps } from 'react';

interface TextboxProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

export const Textbox: React.FC<TextboxProps> = ({ label, className, ...props }) => {
  return (
    <div className={className}>
      <label>
        <div className="text-sm text-neutral-500">{label}</div>
        <input {...props} className="w-full rounded border border-neutral-300 p-1" />
      </label>
    </div>
  );
};
