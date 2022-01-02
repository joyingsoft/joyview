import { FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AppImgContext } from '../../context/app-img-provider';
import './welcome-page.scss';

export const WelcomePage: FC = () => {
  const { getFilesEvent, isLoading } = useContext(AppImgContext);
  return (
    <div className="welcome-page m-lg p-lg">
      <h1>Joying Image Viewer</h1>
      <button onClick={getFilesEvent} className="btn m-lg">
        <FontAwesomeIcon
          icon={isLoading ? faSpinner : faFolderOpen}
          pulse={isLoading}
        />
        <span className="p-l-sm">Open</span>
      </button>
    </div>
  );
};
