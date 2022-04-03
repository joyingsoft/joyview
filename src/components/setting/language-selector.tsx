import React, { FC } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { SupportedLanguageCodes } from '../../i18n/i18n-types';
import { MdButton } from '../md/md-button';

export const LanguageSelector: FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="p-md">
      <MdButton
        hasIcon
        type="text"
        onClick={() => {
          i18n.changeLanguage(
            i18n.language === SupportedLanguageCodes.zh
              ? SupportedLanguageCodes.en
              : SupportedLanguageCodes.zh,
          );
        }}
      >
        <Icon
          icon={`icon-park-outline:${
            i18n.language === SupportedLanguageCodes.zh ? 'english' : 'chinese'
          }`}
        />
        {t(
          `${
            i18n.language === SupportedLanguageCodes.zh
              ? SupportedLanguageCodes.en
              : SupportedLanguageCodes.zh
          }`,
        )}
      </MdButton>
    </div>
  );
};
