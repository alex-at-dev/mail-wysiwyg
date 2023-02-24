import { BlockList } from '../components/BlockList';
import { useMailContext } from '../context/mailContext';

export const MailEditPage: React.FC = () => {
  const { root } = useMailContext();

  return (
    <div className="container flex justify-between gap-4">
      <div>
        <h2 className="uppercase-list-title">Blocks</h2>
        <BlockList />
      </div>
      <div className="w-[800px] bg-neutral-100">page</div>
      <div>
        <h2 className="uppercase-list-title">Add Block</h2>
      </div>
    </div>
  );
};
