import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/app-context-provider';
import { AppImgColsContextProvider } from './context/app-img-cols-provider';
import { AppSpaceContextProvider } from './context/app-space-provider';
import { AppRouter } from './router/app-router';

const getAppBasename = (appPath = 'joying-image-viewer') =>
  window.location.pathname.includes(appPath) ? `/${appPath}` : '/';

export const App: FC = () => {
  return (
    <AppContextProvider>
      <AppSpaceContextProvider>
        <AppImgColsContextProvider>
          <BrowserRouter basename={getAppBasename()}>
            <AppRouter />
          </BrowserRouter>
        </AppImgColsContextProvider>
      </AppSpaceContextProvider>
    </AppContextProvider>
  );
};
