import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/app-context-provider';
import { AppRouter } from './router/app-router';

const getAppBasename = (appPath = 'joying-image-viewer') =>
  window.location.pathname.includes(appPath) ? `/${appPath}` : '/';

export const App: FC = () => {
  return (
    <AppContextProvider>
      <BrowserRouter basename={getAppBasename()}>
        <AppRouter />
      </BrowserRouter>
    </AppContextProvider>
  );
};
