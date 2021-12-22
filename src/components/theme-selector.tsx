import { FC, useContext } from 'react';
import { AppContext, AppThemeEnum } from '../context/app-context-provider';

export const ThemeSelector: FC = () => {
  const { theme, updateThemeEvent } = useContext(AppContext);

  const changeEventHandle = (e: React.BaseSyntheticEvent) => {
    if (updateThemeEvent) {
      updateThemeEvent(e.target.value);
    }
  };

  return (
    <div className="theme-selector">
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
