import { StrictMode, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContextProvider';
import { ImgColumnContextProvider } from './context/ImgColumnContextProvider';
import { AppRouter } from './router/app-router';
import { ImgSpaceContext } from './context/ImgSpaceContext';
import { AppImgContextProvider } from './context/AppImgContextProvider';

const getAppBasename = (appPath = 'joyview') =>
  window.location.pathname.includes(appPath) ? `/${appPath}` : '/';

export const App = () => {
  const [imageSpace, setImageSpace] = useState(8);
  return (
    <StrictMode>
      <AppContextProvider>
        <AppImgContextProvider>
          <ImgSpaceContext value={{ imageSpace, setImageSpace }}>
            <ImgColumnContextProvider>
              <BrowserRouter basename={getAppBasename()}>
                <AppRouter />
              </BrowserRouter>
            </ImgColumnContextProvider>
          </ImgSpaceContext>
        </AppImgContextProvider>
      </AppContextProvider>
    </StrictMode>
  );
};
