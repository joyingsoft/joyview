import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/app-context-provider';
import { MdButton } from '../md/md-button';

export const ThemeSelector = () => {
  const { theme, themeEvent: updateThemeEvent } = useContext(AppContext);
  const { t } = useTranslation();
  const handleBtnClick = () => {
    if (updateThemeEvent) {
      updateThemeEvent(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <div className="theme-selector p-md">
      <MdButton hasIcon type="text" onClick={handleBtnClick}>
        <Icon
          icon={`ic:${
            theme === 'light' ? 'baseline-nightlight' : 'outline-light-mode'
          }`}
        />
        {t(theme === 'light' ? 'dark' : 'light')}
      </MdButton>
    </div>
  );
};
