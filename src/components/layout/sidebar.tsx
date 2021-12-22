import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useContext } from 'react';
import { AppContext } from '../../context/app-context-provider';
import { ThemeSelector } from '../theme-selector';

export const Sidebar: FC = ({ children }) => {
  const { isSidebarOpen, sidebarOpenEvent } = useContext(AppContext);

  return (
    <div className={`sidebar ${isSidebarOpen ? ' p-lg sidebar__open' : ''}`}>
      <button
        className="m-md"
        onClick={() => sidebarOpenEvent && sidebarOpenEvent(false)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <ThemeSelector />
      {children}
    </div>
  );
};
