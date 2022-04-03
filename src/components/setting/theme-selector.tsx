import { Icon } from '@iconify/react';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext, AppThemeEnum } from '../../context/app-context-provider';
import { MdButton } from '../md/md-button';

export const ThemeSelector: FC = () => {
  const { theme, themeEvent: updateThemeEvent } = useContext(AppContext);
  const { t } = useTranslation();
  const handleBtnClick = () => {
    if (updateThemeEvent) {
      updateThemeEvent(
        theme === AppThemeEnum.dark ? AppThemeEnum.light : AppThemeEnum.dark,
      );
    }
  };

  return (
    <div className="theme-selector p-md">
      <MdButton hasIcon type="text" onClick={handleBtnClick}>
        <Icon
          icon={`ic:${
            theme === AppThemeEnum.light
              ? 'baseline-nightlight'
              : 'outline-light-mode'
          }`}
        />
        {t(theme === AppThemeEnum.light ? 'dark' : 'light')}
      </MdButton>
    </div>
  );
};
