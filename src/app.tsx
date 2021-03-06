import { FC, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/app-context-provider';
import { AppImgColsContextProvider } from './context/app-img-cols-provider';
import { AppImgContextProvider } from './context/app-img-provider';
import { AppSpaceContextProvider } from './context/app-space-provider';
import { AppRouter } from './router/app-router';

const getAppBasename = (appPath = 'joyview') =>
  window.location.pathname.includes(appPath) ? `/${appPath}` : '/';

export const App: FC = () => {
  return (
    <StrictMode>
      <AppContextProvider>
        <AppImgContextProvider>
          <AppSpaceContextProvider>
            <AppImgColsContextProvider>
              <BrowserRouter basename={getAppBasename()}>
                <AppRouter />
              </BrowserRouter>
            </AppImgColsContextProvider>
          </AppSpaceContextProvider>
        </AppImgContextProvider>
      </AppContextProvider>
    </StrictMode>
  );
};
