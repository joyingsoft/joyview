import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/app-context-provider';
import { AppImgContext } from '../../context/app-img-provider';
import { MdButton } from '../md/md-button';

export const CloseImgView = () => {
  const { purgeEvent } = useContext(AppImgContext);
  const { view, viewEvent } = useContext(AppContext);
  const { t } = useTranslation();

  const clickEventHandle = () => {
    if (purgeEvent) {
      purgeEvent();
    }
    if (view !== 'welcome' && viewEvent) {
      viewEvent('welcome');
    }
  };

  return (
    <MdButton hasIcon type="text" onClick={clickEventHandle}>
      <Icon icon="ic:baseline-close" />
      {t('closeViewer')}
    </MdButton>
  );
};
