import { HTMLProps } from 'react';
import { AddBlockList } from './AddBlockList';
import { ThemeEditor } from './ThemeEditor';

export const GeneralSettingsPanel: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <AddBlockList />

      <h2 className="uppercase-list-title mx-4 mb-2 mt-6">Theme</h2>
      <ThemeEditor className="px-4" />
    </div>
  );
};
