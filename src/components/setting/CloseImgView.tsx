import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/AppContext';
import { AppImgContext } from '../../context/AppImgContext';
import { MdButton } from '../md/md-button';

export const CloseImgView = () => {
  const { purgeEvent } = useContext(AppImgContext);
  const { view, setView } = useContext(AppContext);
  const { t } = useTranslation();

  const clickEventHandle = () => {
    if (purgeEvent) {
      purgeEvent();
    }
    if (view !== 'welcome' && setView) {
      setView('welcome');
    }
  };

  return (
    <MdButton hasIcon type="text" onClick={clickEventHandle}>
      <Icon icon="ic:baseline-close" />
      {t('closeViewer')}
    </MdButton>
  );
};
