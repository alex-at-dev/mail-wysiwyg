import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { BlockStyle } from '../types/BlockStyle';
import { Color } from '../types/Color';
import { FontSetting } from '../types/FontSetting';
import { ReorderType } from '../types/ReorderType';
import { Uuid4 } from '../types/Uuid';
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
  const getColor = (id: Uuid4) => theme.colors.find((c) => c.id === id);
  const getColorStyle = (colorId: Uuid4, property: 'color' | 'background' = 'color') => {
    const color = getColor(colorId);
    if (!color) return null;
    return { [property]: color.hex };
  };

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
  const getFont = (id: Uuid4) => theme.fonts.find((f) => f.id === id);
  const getFontStyle = (fontId: Uuid4) => {
    const font = getFont(fontId);
    if (!font) return null;
    return {
      fontWeight: font.weight,
      fontFamily: font.family,
      fontSize: font.size + 'px',
      lineHeight: font.lineHeight,
    };
  };

  const getBlockStyle = ({ color, background, font }: BlockStyle) => {
    let styles = [];
    if (color) {
      const colorStyle = getColorStyle(color);
      if (colorStyle) styles.push(colorStyle);
    }
    if (background) {
      const bgStyle = getColorStyle(background, 'background');
      if (bgStyle) styles.push(bgStyle);
    }
    if (font) {
      const fontStyle = getFontStyle(font);
      if (fontStyle) styles.push(fontStyle);
    }
    return Object.assign({}, ...styles);
  };

  return {
    theme,
    getBlockStyle,
    // colors
    addColor,
    removeColor,
    updateColor,
    reorderColors,
    getColor,
    // fonts
    addFont,
    removeFont,
    updateFont,
    reorderFonts,
    getFont,
  };
};
