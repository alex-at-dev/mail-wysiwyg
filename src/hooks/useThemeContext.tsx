import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { Color } from '../types/Color';
import { FontSetting } from '../types/FontSetting';
import { ReorderType } from '../types/ReorderType';
import { WithId } from '../types/WithId';

type ThemeField = 'colors' | 'fonts';

export const useThemeContext = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const addFieldItem = <T extends WithId>(field: ThemeField, val: T) => {
    setTheme({ ...theme, [field]: [...theme[field], val] });
  };

  const removeFieldItem = <T extends WithId>(field: ThemeField, val: T) => {
    const collection = theme[field] as { id: string }[];
    setTheme({ ...theme, [field]: collection.filter((i) => i.id !== val.id) });
  };

  const updateFieldItem = <T extends WithId>(field: ThemeField, val: T) => {
    const collection = theme[field];
    let updatedItemIndex = collection.length;
    while (updatedItemIndex--) {
      let item = collection[updatedItemIndex];
      // not the item we're looking for -> continue
      if (item.id !== val.id) continue;
      // value didn't change -> return
      if (JSON.stringify(item) === JSON.stringify(val)) return;
      break;
    }
    const updatedCollection = [...collection];
    updatedCollection[updatedItemIndex] = val as any;

    setTheme({
      ...theme,
      [field]: updatedCollection,
    });
  };

  const reorderFieldItems = (
    field: ThemeField,
    srcId: string,
    targetId: string,
    type: ReorderType
  ) => {
    const collection = theme[field] as WithId[];
    const srcItem = collection.find((i) => i.id === srcId);
    if (!srcItem) return;
    let updatedCollection: WithId[] = [];
    for (let i = 0; i < collection.length; i++) {
      const item = collection[i];
      if (item.id === srcId) continue;
      if (item.id === targetId && type === 'putBefore') updatedCollection.push(srcItem);
      updatedCollection.push(item);
      if (item.id === targetId && type === 'putAfter') updatedCollection.push(srcItem);
    }

    setTheme({ ...theme, [field]: updatedCollection });
  };

  // COLORS
  const addColor = () => {
    addFieldItem<Color>('colors', { id: crypto.randomUUID(), name: '', hex: '#ffffff' });
  };
  const removeColor = (color: Color) => removeFieldItem<Color>('colors', color);
  const updateColor = (color: Color) => updateFieldItem<Color>('colors', color);
  const reorderColors = (srcId: string, targetId: string, type: ReorderType) =>
    reorderFieldItems('colors', srcId, targetId, type);

  // FONTS
  const addFont = () => {
    addFieldItem<FontSetting>('fonts', {
      id: crypto.randomUUID(),
      name: '',
      family: 'sans-serif',
      weight: 400,
      size: 16,
      lineHeight: 1.5,
    });
  };
  const removeFont = (font: FontSetting) => removeFieldItem<FontSetting>('fonts', font);
  const updateFont = (font: FontSetting) => updateFieldItem<FontSetting>('fonts', font);
  const reorderFonts = (srcId: string, targetId: string, type: ReorderType) =>
    reorderFieldItems('fonts', srcId, targetId, type);

  return {
    theme,
    addColor,
    removeColor,
    updateColor,
    reorderColors,
    addFont,
    removeFont,
    updateFont,
    reorderFonts,
  };
};
