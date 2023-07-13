import { HTMLProps } from 'react';
import { AddBlockList } from './AddBlockList';
import { SettingsButton } from './SettingsButton';

export const GeneralSettingsPanel: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <h2 className="uppercase-list-title mx-4 mb-1">Add Block</h2>
      <AddBlockList />

      <h2 className="uppercase-list-title mx-4 mb-1 mt-6">Settings</h2>
      <SettingsButton
        disabled
        icon="fa-grip-lines"
        label="Reorder blocks"
        description="Change the order of elements in the mail"
      />
      <SettingsButton
        disabled
        icon="fa-heading"
        label="Edit Theme"
        description="Edit style settings"
      />
    </div>
  );
};
