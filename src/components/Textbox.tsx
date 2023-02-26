import { HTMLProps } from 'react';

interface TextboxProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

export const Textbox: React.FC<TextboxProps> = ({ label, className, ...props }) => {
  return (
    <div className={className}>
      <label>
        <div className="text-xs text-neutral-500">{label}</div>
        <input {...props} className="w-full border border-neutral-300" />
      </label>
    </div>
  );
};
