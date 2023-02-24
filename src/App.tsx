import { MailContextProvider } from './context/mailContext';
import { MailEditPage } from './pages/MailEditPage';

export const App = () => {
  return (
    <MailContextProvider>
      <MailEditPage />
    </MailContextProvider>
  );
};
