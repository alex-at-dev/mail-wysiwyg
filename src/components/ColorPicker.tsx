import { useState } from 'react';
import { useThemeContext } from '../hooks/useThemeContext';
import { cx } from '../modules/util';
import { Color } from '../types/Color';
import { PropertyButton } from './PropertyButton';

interface ColorPickerProps {
  selectedColor?: Color;
  onSelectedColorChange?: (color: Color | null) => void;
}

const defaultColor: Color = {
  id: '0000-0000-0000-0000-0000',
  name: '<none>',
  hex: 'transparent',
};

const ColorLabel: React.FC<{ color?: Color }> = ({ color }) => {
  if (!color) color = defaultColor;

  return (
    <div className="flex items-center gap-2">
      <div
        className="h-5 w-5 flex-none rounded-full border border-neutral-200"
        style={{ background: color.hex }}
      />
      {color.name}
    </div>
  );
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectedColorChange,
}) => {
  const [open, setOpen] = useState(false);
  const { theme } = useThemeContext();

  const handleColorSelect = (color: Color | null) => {
    if (onSelectedColorChange) onSelectedColorChange(color);
    setOpen(false);
  };

  return (
    <div className="relative -mx-2">
      <PropertyButton onClick={() => setOpen(!open)}>
        <ColorLabel color={selectedColor} />
      </PropertyButton>
      <div
        className={cx(
          'absolute top-full z-30 flex min-w-[10rem] flex-col rounded border border-neutral-200 bg-white shadow-lg',
          { invisible: !open }
        )}
      >
        <PropertyButton onClick={() => handleColorSelect(null)}>
          <ColorLabel color={defaultColor} />
        </PropertyButton>
        {theme.colors.map((c) => (
          <PropertyButton key={c.id} onClick={() => handleColorSelect(c)}>
            <ColorLabel color={c} />
          </PropertyButton>
        ))}
      </div>
    </div>
  );
};
