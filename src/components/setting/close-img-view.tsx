import { Icon } from '@iconify/react';
import { FC, useContext } from 'react';
import { AppContext, AppViewEnum } from '../../context/app-context-provider';
import { AppImgContext } from '../../context/app-img-provider';
import { MdButton } from '../md/md-button';

export const CloseImgView: FC = () => {
  const { purgeEvent } = useContext(AppImgContext);
  const { view, viewEvent } = useContext(AppContext);

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
      Close image view
    </MdButton>
  );
};
