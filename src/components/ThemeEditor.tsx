import { HTMLProps } from 'react';
import { useReorderList } from '../hooks/useReorderList';
import { useThemeContext } from '../hooks/useThemeContext';
import { ColorEditor } from './ColorEditor';
import { ColorPicker } from './ColorPicker';
import { FontSettingEditor } from './FontSettingEditor';
import { InputLabel } from './InputLabel';
import { PropertyButton } from './PropertyButton';
import { Textbox } from './Textbox';

export const ThemeEditor: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const {
    theme,
    getColor,
    addColor,
    removeColor,
    updateColor,
    addFont,
    removeFont,
    updateFont,
    reorderColors,
    reorderFonts,
    updateLayout,
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

      <h3 className="uppercase-sub-title mt-5">Basic settings</h3>
      <div>
        <InputLabel className="mt-2 block">
          Body background (background color around the email)
        </InputLabel>
        <ColorPicker
          selectedColor={getColor(theme.layout.bodyBg)}
          onSelectedColorChange={(color) => updateLayout({ bodyBg: color?.id })}
        />
        <InputLabel className="mt-2 block">
          Mail background (background color inside the actual email)
        </InputLabel>
        <ColorPicker
          selectedColor={getColor(theme.layout.mailBg)}
          onSelectedColorChange={(color) => updateLayout({ mailBg: color?.id })}
        />
        <Textbox
          className="mt-2"
          type="number"
          min="320"
          label="Mail width (fixed width of the email content)"
          defaultValue={theme.layout.mailWidth}
          onBlur={(ev) => updateLayout({ mailWidth: parseInt(ev.target.value) })}
        />
      </div>
    </div>
  );
};
