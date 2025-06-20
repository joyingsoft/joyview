import { type ReactNode, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useMediaSize } from '../../hooks/use-media-size';

export const Contents = ({ children }: { children: ReactNode }) => {
  const { isSidebarOpen } = useContext(AppContext);
  const mediaSize = useMediaSize();

  const isLageScreen =
    mediaSize === 'xxl' || mediaSize === 'xl' || mediaSize === 'lg';

  const sidebarWidth = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--sidebar-width');

  const marginLeft =
    isLageScreen && isSidebarOpen ? `${Number.parseFloat(sidebarWidth)}px` : 0;

  return (
    <div
      className={`contents`}
      style={{
        marginLeft,
      }}
    >
      {children}
    </div>
  );
};
