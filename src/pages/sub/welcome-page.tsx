import { Icon } from '@iconify/react';
import { FC, useContext } from 'react';
import { MdButton } from '../../components/md/md-button';
import { AppImgContext } from '../../context/app-img-provider';
import './welcome-page.scss';

export const WelcomePage: FC = () => {
  const { getFilesEvent, isLoading } = useContext(AppImgContext);
  return (
    <div className="welcome-page m-lg p-lg">
      <h1>Joying Image Viewer</h1>
      <MdButton
        role="button"
        onClick={getFilesEvent}
        hasIcon
        isLoading={isLoading}
      >
        <Icon icon="ic:baseline-folder-open" />
        Open
      </MdButton>
      {/* <button onClick={getFilesEvent} className="btn m-lg"> */}
      {/* <Icon */}
      {/* icon={isLoading ? 'fa:spinner' : 'fa:folder-open'} */}
      {/* // pulse={isLoading} */}
      {/* /> */}
      {/* <Icon icon="ic:baseline-loop" /> */}
      {/* <span className="p-l-sm">Open</span> */}
      {/* </button> */}
    </div>
  );
};
