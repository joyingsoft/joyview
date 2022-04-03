import { Icon } from '@iconify/react';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext, AppViewEnum } from '../../context/app-context-provider';
import { AppImgContext } from '../../context/app-img-provider';
import { MdButton } from '../md/md-button';

export const CloseImgView: FC = () => {
  const { purgeEvent } = useContext(AppImgContext);
  const { view, viewEvent } = useContext(AppContext);
  const { t } = useTranslation();

  const clickEventHandle = () => {
    if (purgeEvent) {
      purgeEvent();
    }
    if (view !== AppViewEnum.welcome && viewEvent) {
      viewEvent(AppViewEnum.welcome);
    }
  };

  return (
    <MdButton hasIcon type="text" onClick={clickEventHandle}>
      <Icon icon="ic:baseline-close" />
      {t('closeViewer')}
    </MdButton>
  );
};
