import { ChangeEvent, FocusEvent, useState } from 'react';
import { Color } from '../types/Color';
import { ColorInput } from './ColorInput';
import { PropertyButton } from './PropertyButton';
import { PropertyInput } from './PropertyInput';

interface ColorEditorProps {
  color: Color;
  onColorChange: (color: Color) => void;
  onColorRemove: (color: Color) => void;
}

export const ColorEditor: React.FC<ColorEditorProps> = ({
  color,
  onColorChange,
  onColorRemove,
}) => {
  const [hex, setHex] = useState(color.hex);

  const handleBlur = (ev: FocusEvent<HTMLInputElement>) => {
    onColorChange({ ...color, [ev.target.name]: ev.target.value });
  };

  return (
    <div className="-ml-1 flex items-center">
      <PropertyInput placeholder="name" name="name" defaultValue={color.name} onBlur={handleBlur} />
      <ColorInput
        placeholder="color"
        name="hex"
        value={hex}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => setHex(ev.target.value)}
        onBlur={handleBlur}
      />
      <PropertyButton className="fa fa-minus" onClick={() => onColorRemove(color)} />
    </div>
  );
};
