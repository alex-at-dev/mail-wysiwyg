import { useState } from 'react';
import { useThemeContext } from '../hooks/useThemeContext';
import { cx } from '../modules/util';
import { FontSetting } from '../types/FontSetting';
import { PropertyButton } from './PropertyButton';

interface FontPickerProps {
  selectedFont?: FontSetting;
  onSelectedFontChange?: (font: FontSetting) => void;
}

const defaultFont = { weight: 400, id: '-1', name: '<Select a font>' } as unknown as FontSetting;
const FontLabel: React.FC<{ font?: FontSetting }> = ({ font }) => {
  if (!font) font = defaultFont;

  return (
    <div className="flex items-center gap-2">
      <div className="h-5 w-5 flex-none" style={{ fontWeight: font.weight }}>
        Aa
      </div>
      {font.name}
    </div>
  );
};

export const FontPicker: React.FC<FontPickerProps> = ({ selectedFont, onSelectedFontChange }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useThemeContext();

  const handleFontSelect = (font: FontSetting) => {
    if (onSelectedFontChange) onSelectedFontChange(font);
    setOpen(false);
  };

  return (
    <div className="relative -mx-2">
      <PropertyButton onClick={() => setOpen(!open)}>
        <FontLabel font={selectedFont} />
      </PropertyButton>
      <div
        className={cx(
          'absolute top-full z-30 flex min-w-[10rem] flex-col rounded border border-neutral-200 bg-white shadow-lg',
          { invisible: !open }
        )}
      >
        {theme.fonts.map((c) => (
          <PropertyButton key={c.id} onClick={() => handleFontSelect(c)}>
            <FontLabel font={c} />
          </PropertyButton>
        ))}
      </div>
    </div>
  );
};
