import { Icon } from '@iconify/react';
import { type ReactNode, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import { MdButton } from '../md/md-button';
import { CloseImgView } from '../setting/CloseImgView';
import { ImageColumnsSetting } from '../setting/ImageColumnsSetting';
import { ImageSpaceSetting } from '../setting/ImageSpaceSetting';
import { LanguageSelector } from '../setting/LanguageSelector';
import { ThemeSelector } from '../setting/ThemeSelector';

export const Sidebar = ({ children }: { children?: ReactNode }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isSidebarOpen, setIsSidebarOpen, view } = useContext(AppContext);

  useEffect(() => {
    const clickEventHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('click', clickEventHandler);
    } else {
      document.removeEventListener('click', clickEventHandler);
    }

    return () => {
      document.removeEventListener('click', clickEventHandler);
    };
  }, [sidebarRef, isSidebarOpen, setIsSidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar${isSidebarOpen ? ' p-lg sidebar__open' : ''}`}
    >
      <MdButton type="outlined" hasIcon onClick={() => setIsSidebarOpen(false)}>
        <Icon icon="ic:baseline-chevron-left" />
      </MdButton>

      <div className="sidebar__c">
        <ThemeSelector />
        <LanguageSelector />
        {view === 'masonryVertical' && (
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
