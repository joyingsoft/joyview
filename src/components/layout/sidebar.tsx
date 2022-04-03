import { Icon } from '@iconify/react';
import { FC, useContext } from 'react';
import { AppContext, AppViewEnum } from '../../context/app-context-provider';
import { MdButton } from '../md/md-button';
import { CloseImgView } from '../setting/close-img-view';
import { ImageColumnsSetting } from '../setting/image-columns-setting';
import { ImageSpaceSetting } from '../setting/image-space-setting';
import { LanguageSelector } from '../setting/language-selector';
import { ThemeSelector } from '../setting/theme-selector';

export const Sidebar: FC = ({ children }) => {
  const { isSidebarOpen, sidebarOpenEvent, view } = useContext(AppContext);

  return (
    <div className={`sidebar${isSidebarOpen ? ' p-lg sidebar__open' : ''}`}>
      <MdButton
        type="outlined"
        hasIcon
        onClick={() => sidebarOpenEvent && sidebarOpenEvent(false)}
      >
        <Icon icon="ic:baseline-chevron-left" />
      </MdButton>

      <div className="sidebar__c">
        <ThemeSelector />
        <LanguageSelector />
        {view === AppViewEnum.masonryVertical && (
          <>
            <ImageSpaceSetting />
            <ImageColumnsSetting />
            <CloseImgView />
          </>
        )}
        {children}
      </div>
    </div>
  );
};
