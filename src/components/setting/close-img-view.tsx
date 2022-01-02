import { FC, useContext } from 'react';
import { AppContext, AppViewEnum } from '../../context/app-context-provider';
import { AppImgContext } from '../../context/app-img-provider';

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
    <button role="button" className="btn btn-warn" onClick={clickEventHandle}>
      Close image view
    </button>
  );
};
