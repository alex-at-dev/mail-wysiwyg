import { ComponentPropsWithoutRef } from 'react';
import { useEditorContext } from '../hooks/useEditorContext';
import { useThemeContext } from '../hooks/useThemeContext';
import { BlockStyle } from '../types/BlockStyle';
import { Color } from '../types/Color';
import { FontSetting } from '../types/FontSetting';
import { ColorPicker } from './ColorPicker';
import { FontPicker } from './FontPicker';

interface StyleEditorProps extends ComponentPropsWithoutRef<'div'> {
  hiddenEditors?: (keyof BlockStyle)[];
}

export const StyleEditor: React.FC<StyleEditorProps> = ({ hiddenEditors, ...props }) => {
  const { selectedEntry, updateBlock } = useEditorContext();
  const { theme } = useThemeContext();
  if (!selectedEntry?.node) return null;

  const handleFontSelect = (font: FontSetting) => {
    updateBlock({ ...selectedEntry.node, style: { ...selectedEntry.node.style, font: font.id } });
  };

  const handleColorSelect = (color: Color | null) => {
    updateBlock({
      ...selectedEntry.node,
      style: { ...selectedEntry.node.style, color: color?.id },
    });
  };

  const handleBgSelect = (color: Color | null) => {
    updateBlock({
      ...selectedEntry.node,
      style: { ...selectedEntry.node.style, background: color?.id },
    });
  };

  const hideEditor = hiddenEditors
    ? hiddenEditors.reduce((obj, e) => {
        obj[e] = true;
        return obj;
      }, {} as Partial<Record<keyof BlockStyle, boolean>>)
    : {};
  const color = theme.colors.find((c) => c.id === selectedEntry.node.style.color);
  const background = theme.colors.find((c) => c.id === selectedEntry.node.style.background);
  const font = theme.fonts.find((c) => c.id === selectedEntry.node.style.font);

  return (
    <div {...props}>
      <h2 className="uppercase-list-title mb-2">Styles</h2>
      {!hideEditor.font && (
        <>
          <h3 className="uppercase-sub-title mb-1">Typography</h3>
          <FontPicker selectedFont={font} onSelectedFontChange={handleFontSelect} />
        </>
      )}
      {!hideEditor.color && (
        <>
          <h3 className="uppercase-sub-title  mt-4 mb-1">Color</h3>
          <ColorPicker selectedColor={color} onSelectedColorChange={handleColorSelect} />
        </>
      )}
      {!hideEditor.background && (
        <>
          <h3 className="uppercase-sub-title mt-4 mb-1">Background color</h3>
          <ColorPicker selectedColor={background} onSelectedColorChange={handleBgSelect} />
        </>
      )}
    </div>
  );
};
