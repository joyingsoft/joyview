import { Icon } from '@iconify/react';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MdButton } from '../../components/md/md-button';
import { AppImgContext } from '../../context/app-img-provider';
import './welcome-page.scss';

export const WelcomePage: FC = () => {
  const { getFilesEvent, isLoading } = useContext(AppImgContext);
  const { t } = useTranslation();
  return (
    <div className="welcome-page m-lg p-lg">
      <h1>{t('joyingImageViewer')}</h1>
      <MdButton
        role="button"
        onClick={getFilesEvent}
        hasIcon
        isLoading={isLoading}
      >
        <Icon icon="ic:baseline-folder-open" />
        {t('common:open')}
      </MdButton>
    </div>
  );
};
