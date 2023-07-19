import { Theme } from './Theme';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
