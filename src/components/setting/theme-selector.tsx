import { FC, useContext } from 'react';
import { AppContext, AppThemeEnum } from '../../context/app-context-provider';

export const ThemeSelector: FC = () => {
  const { theme, themeEvent: updateThemeEvent } = useContext(AppContext);

  const changeEventHandle = (e: React.BaseSyntheticEvent) => {
    if (updateThemeEvent) {
      updateThemeEvent(e.target.value);
    }
  };

  return (
    <div className="theme-selector p-md">
      <label>
        <input
          type="radio"
          name="dark"
          value={AppThemeEnum.dark}
          checked={theme === AppThemeEnum.dark}
          onChange={changeEventHandle}
        />
        Dark
      </label>
      <label>
        <input
          type="radio"
          name="light"
          value={AppThemeEnum.light}
          checked={theme === AppThemeEnum.light}
          onChange={changeEventHandle}
        />
        Light
      </label>
    </div>
  );
};
