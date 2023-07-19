import { HTMLProps } from 'react';
import { useReorderList } from '../hooks/useReorderList';
import { useThemeContext } from '../hooks/useThemeContext';
import { ColorEditor } from './ColorEditor';
import { FontSettingEditor } from './FontSettingEditor';
import { PropertyButton } from './PropertyButton';

export const ThemeEditor: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const {
    theme,
    addColor,
    removeColor,
    updateColor,
    addFont,
    removeFont,
    updateFont,
    reorderColors,
    reorderFonts,
  } = useThemeContext();
  const { getHandlers: getReorderHandlersColor } = useReorderList(reorderColors);
  const { getHandlers: getReorderHandlersFonts } = useReorderList(reorderFonts);

  return (
    <div {...props}>
      <div className="flex items-center justify-between">
        <h3 className="uppercase-sub-title">Colors</h3>
        <PropertyButton className="fa fa-plus" onClick={addColor} />
      </div>
      {theme.colors.map((c) => (
        <ColorEditor
          key={c.id}
          color={c}
          onColorChange={updateColor}
          onColorRemove={removeColor}
          getReorderHandlers={getReorderHandlersColor}
        />
      ))}

      <div className="mt-4 flex items-center justify-between">
        <h3 className="uppercase-sub-title">Typography</h3>
        <PropertyButton className="fa fa-plus" onClick={addFont} />
      </div>
      {theme.fonts.map((f) => (
        <FontSettingEditor
          key={f.id}
          font={f}
          onFontChange={updateFont}
          onFontRemove={removeFont}
          getReorderHandlers={getReorderHandlersFonts}
        />
      ))}
    </div>
  );
};
