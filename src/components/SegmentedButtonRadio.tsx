import { HTMLProps, useState } from 'react';
import { cx } from '../modules/util';
import { InputLabel } from './InputLabel';

interface ChoiceboxData {
  value: string;
  label: string;
}

const transformToChoiceboxData: (data: (string | ChoiceboxData)[]) => ChoiceboxData[] = (data) =>
  data.map((d) => (typeof d === 'object' ? d : { value: d, label: d }));

interface SegmentedButtonRadioProps extends HTMLProps<HTMLInputElement> {
  name: string;
  label: string;
  options: (string | ChoiceboxData)[];
}

export const SegmentedButtonRadio: React.FC<SegmentedButtonRadioProps> = ({
  id,
  name,
  label,
  options,
  className,
  ...props
}) => {
  const optionsChoiceboxData = transformToChoiceboxData(options);
  const [id_safe] = useState(id || 'el-' + Math.floor(Math.random() * 100000));

  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <div className="flex items-center pl-px">
        {optionsChoiceboxData.map((o) => (
          <div key={o.value}>
            <input
              id={`${id_safe}_${o.value}`}
              className={cx(className, 'peer invisible absolute')}
              type="radio"
              name={name}
              value={o.value}
              {...props}
            />
            <label
              htmlFor={`${id_safe}_${o.value}`}
              className="-ml-px cursor-pointer select-none whitespace-nowrap border border-neutral-300 px-2 py-1 text-sm peer-checked:bg-neutral-100"
            >
              {o.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
