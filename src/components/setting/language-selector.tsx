import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { MdButton } from '../md/md-button';

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="p-md">
      <MdButton
        hasIcon
        type="text"
        onClick={() => {
          i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
        }}
      >
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
