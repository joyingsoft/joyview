import { StrictMode, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContextProvider';
import { ImgColumnContextProvider } from './context/ImgColumnContextProvider';
import { AppRouter } from './router/app-router';
import { ImgSpaceContext } from './context/ImgSpaceContext';
import { AppImgContextProvider } from './context/AppImgContextProvider';
import { LocalStorageUtils } from './utils/local-storage';
import { useTranslation } from 'react-i18next';

const getAppBasename = (appPath = 'joyview') =>
  window.location.pathname.includes(appPath) ? `/${appPath}` : '/';

export const App = () => {
  const { i18n } = useTranslation();
  const storedImageSpace = LocalStorageUtils.load('imageSpace');
  const storedImgSpace =
    storedImageSpace && storedImageSpace?.length > 0
      ? Number(storedImageSpace)
      : null;
  const [imageSpace, setImageSpace] = useState(storedImgSpace ?? 4);

  const storedLanguage = LocalStorageUtils.load('language');
  useEffect(() => {
    if (i18n && storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage);
    }
  });
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
