import { ChangeEvent, FocusEvent, useState } from 'react';
import { Color } from '../types/Color';
import { ReorderHandlers } from '../types/ReorderHandlers';
import { Uuid4 } from '../types/Uuid';
import { ColorInput } from './ColorInput';
import { PropertyButton } from './PropertyButton';
import { PropertyInput } from './PropertyInput';
import { ReorderButton } from './ReorderButton';

interface ColorEditorProps {
  color: Color;
  onColorChange: (color: Color) => void;
  onColorRemove: (color: Color) => void;
  getReorderHandlers: (id: Uuid4) => ReorderHandlers;
}

export const ColorEditor: React.FC<ColorEditorProps> = ({
  color,
  onColorChange,
  onColorRemove,
  getReorderHandlers,
}) => {
  const [hex, setHex] = useState(color.hex);
  const { draggable, onDragStart, ...reorderHandlers } = getReorderHandlers(color.id);

  const handleBlur = (ev: FocusEvent<HTMLInputElement>) => {
    onColorChange({ ...color, [ev.target.name]: ev.target.value });
  };

  return (
    <div className="-ml-1 flex items-center" {...reorderHandlers}>
      <ReorderButton draggable={draggable} onDragStart={onDragStart} />
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
