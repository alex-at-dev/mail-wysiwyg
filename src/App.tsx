import { EditorContextProvider } from './context/editorContext';
import { ThemeContextProvider } from './context/themeContext';
import { MailEditPage } from './pages/MailEditPage';

export const App = () => {
  return (
    <ThemeContextProvider>
      <EditorContextProvider>
        <MailEditPage />
      </EditorContextProvider>
    </ThemeContextProvider>
  );
};
