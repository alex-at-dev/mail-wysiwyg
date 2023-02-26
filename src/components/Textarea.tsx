import { HTMLProps } from 'react';

interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, className, ...props }) => {
  return (
    <div className={className}>
      <label>
        <div className="text-xs text-neutral-500">{label}</div>
        <textarea {...props} className="w-full border border-neutral-300" rows={3} />
      </label>
    </div>
  );
};
