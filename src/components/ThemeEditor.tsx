import { HTMLProps } from 'react';
import { useEditorContext } from '../context/useEditorContext';
import { Color } from '../types/Color';
import { ColorEditor } from './ColorEditor';
import { PropertyButton } from './PropertyButton';

export const ThemeEditor: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { theme, setTheme } = useEditorContext();

  const handleColorAdd = () => {
    setTheme({
      ...theme,
      colors: [...theme.colors, { id: crypto.randomUUID(), name: '', hex: '#ffffff' }],
    });
  };

  const handleColorRemove = (color: Color) => {
    setTheme({ ...theme, colors: theme.colors.filter((c) => c.id !== color.id) });
  };

  const handleColorChange = (color: Color) => {
    let updatedColorIndex = theme.colors.length;
    while (updatedColorIndex--) {
      let c = theme.colors[updatedColorIndex];
      // not the color we're looking for -> continue
      if (c.id !== color.id) continue;
      // color didn't change -> return
      if (c.name === color.name && c.hex === color.hex) return;
      break;
    }
    const updatedColors = [...theme.colors];
    updatedColors[updatedColorIndex] = color;
    setTheme({
      ...theme,
      colors: updatedColors,
    });
  };

  return (
    <div {...props}>
      <div className="flex items-center justify-between">
        <h3 className="uppercase-sub-title">Colors</h3>
        <PropertyButton className="fa fa-plus" onClick={handleColorAdd} />
      </div>
      {theme.colors.map((c) => (
        <ColorEditor
          key={c.id}
          color={c}
          onColorChange={handleColorChange}
          onColorRemove={handleColorRemove}
        />
      ))}
    </div>
  );
};
