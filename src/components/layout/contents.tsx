import { FC, useContext } from 'react';
import { AppContext } from '../../context/app-context-provider';
import { AppSpaceContext } from '../../context/app-space-provider';
import { MediaSizeName, useMediaSize } from '../../hooks/use-media-size';
import icssVars from '../../styles/export.icss.scss';

export const Contents: FC = ({ children }) => {
  const { isSidebarOpen } = useContext(AppContext);
  const { imagePaddingPx } = useContext(AppSpaceContext);
  const mediaSize = useMediaSize();

  const isLageScreen =
    mediaSize === MediaSizeName.xxl ||
    mediaSize === MediaSizeName.xl ||
    mediaSize === MediaSizeName.lg;

  const marginLeft =
    isLageScreen && isSidebarOpen
      ? `${Number.parseFloat(icssVars.sidebarWidth) + imagePaddingPx}px`
      : 0;

  return (
    <div
      className={`contents${isSidebarOpen ? ' contents__r' : ''}`}
      style={{
        marginLeft,
      }}
    >
      {children}
    </div>
  );
};
