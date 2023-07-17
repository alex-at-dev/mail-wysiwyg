import { HTMLProps } from 'react';
import { InputLabel } from './InputLabel';

interface TextboxProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

export const Textbox: React.FC<TextboxProps> = ({ label, className, ...props }) => {
  return (
    <div className={className}>
      <label>
        <InputLabel>{label}</InputLabel>
        <input {...props} className="w-full rounded border border-neutral-300 p-1" />
      </label>
    </div>
  );
};
