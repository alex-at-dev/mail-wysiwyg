import { EditorContextProvider } from './context/editorContext';
import { MailEditPage } from './pages/MailEditPage';

export const App = () => {
  return (
    <EditorContextProvider>
      <MailEditPage />
    </EditorContextProvider>
  );
};
