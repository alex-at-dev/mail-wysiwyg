import { HTMLProps } from 'react';
import { InputLabel } from './InputLabel';

interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, className, ...props }) => {
  return (
    <div className={className}>
      <label>
        <InputLabel>{label}</InputLabel>
        <textarea {...props} className="w-full rounded border border-neutral-300 p-1" rows={3} />
      </label>
    </div>
  );
};
