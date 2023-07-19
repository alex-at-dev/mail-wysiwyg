import { HTMLProps } from 'react';
import { AddBlockList } from './AddBlockList';
import { SettingsButton } from './SettingsButton';
import { Textbox } from './Textbox';
import { ThemeEditor } from './ThemeEditor';

export const GeneralSettingsPanel: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <h2 className="uppercase-list-title mx-4 mb-1">Add Block</h2>
      <AddBlockList />

      <h2 className="uppercase-list-title mx-4 mb-2 mt-6">Theme</h2>
      <ThemeEditor className="px-4" />
      <div className="space-y-4 px-4">
        <Textbox label="Body background (background color around the email)" />
        <Textbox label="Mail background (background color inside the actual email)" />
        <Textbox label="Mail width (fixed width of the email content)" />
      </div>
      <h2 className="uppercase-list-title mx-4 mb-1 mt-6">Future features</h2>
      <SettingsButton
        disabled
        icon="fa-heading"
        label="Edit Theme"
        description="Edit style settings"
      />
    </div>
  );
};
