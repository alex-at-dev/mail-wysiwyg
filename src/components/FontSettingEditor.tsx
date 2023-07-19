import { FocusEvent } from 'react';
import { FontSetting } from '../types/FontSetting';
import { ReorderHandlers } from '../types/ReorderHandlers';
import { PropertyButton } from './PropertyButton';
import { PropertyInput } from './PropertyInput';
import { ReorderButton } from './ReorderButton';

interface FontSettingEditorProps {
  font: FontSetting;
  onFontChange: (font: FontSetting) => void;
  onFontRemove: (font: FontSetting) => void;
  getReorderHandlers: (id: string) => ReorderHandlers;
}

export const FontSettingEditor: React.FC<FontSettingEditorProps> = ({
  font,
  onFontChange,
  onFontRemove,
  getReorderHandlers,
}) => {
  const { draggable, onDragStart, ...reorderHandlers } = getReorderHandlers(font.id);

  const handleBlur = (ev: FocusEvent<HTMLInputElement>) => {
    onFontChange({ ...font, [ev.target.name]: ev.target.value });
  };

  return (
    <div
      className="-ml-1 border-b border-b-neutral-300 py-1 last-of-type:border-b-0"
      {...reorderHandlers}
    >
      <div className="flex items-center">
        <ReorderButton draggable={draggable} onDragStart={onDragStart} />
        <PropertyInput
          name="name"
          placeholder="preset name"
          defaultValue={font.name}
          className="w-full font-medium"
          onBlur={handleBlur}
        />
        <PropertyButton className="fa fa-minus" onClick={() => onFontRemove(font)} />
      </div>
      <div className="grid grid-cols-2">
        <PropertyInput
          name="family"
          placeholder="font-family"
          defaultValue={font.family}
          onBlur={handleBlur}
        />
        <PropertyInput
          name="weight"
          placeholder="font-weight"
          defaultValue={font.weight}
          onBlur={handleBlur}
          type="number"
          min="100"
          max="900"
          step="100"
        />
        <PropertyInput
          name="size"
          placeholder="font-size"
          defaultValue={font.size}
          onBlur={handleBlur}
          type="number"
          min="1"
          step="1"
        />
        <PropertyInput
          name="lineHeight"
          placeholder="line-height"
          defaultValue={font.lineHeight}
          onBlur={handleBlur}
          type="number"
          min="0.1"
          step="0.1"
        />
      </div>
    </div>
  );
};
