import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useContext } from 'react';
import { AppContext, AppViewEnum } from '../../context/app-context-provider';
import { ImageColumnsSetting } from '../image-columns-setting';
import { ImageSpaceSetting } from '../image-space-setting';
import { ThemeSelector } from '../theme-selector';

export const Sidebar: FC = ({ children }) => {
  const { isSidebarOpen, sidebarOpenEvent, view } = useContext(AppContext);

  return (
    <div className={`sidebar${isSidebarOpen ? ' p-lg sidebar__open' : ''}`}>
      <button
        className="m-md"
        onClick={() => sidebarOpenEvent && sidebarOpenEvent(false)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <div className="sidebar__c">
        <ThemeSelector />
        {view === AppViewEnum.masonryVertical && (
          <>
            <ImageSpaceSetting />
            <ImageColumnsSetting />
          </>
        )}
        {children}
      </div>
    </div>
  );
};
