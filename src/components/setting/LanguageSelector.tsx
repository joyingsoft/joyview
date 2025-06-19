import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { MdButton } from '../md/md-button';
import { LocalStorageUtils } from '../../utils/local-storage';

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLanguage);
    LocalStorageUtils.save('language', newLanguage);
  };
  return (
    <div className="p-md">
      <MdButton hasIcon type="text" onClick={toggleLanguage}>
        <Icon
          icon={`icon-park-outline:${
            i18n.language === 'zh' ? 'english' : 'chinese'
          }`}
        />
        {t(`${i18n.language === 'zh' ? 'en' : 'zh'}`)}
      </MdButton>
    </div>
  );
};
