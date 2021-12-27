import { FC, useContext } from 'react';
import { AppContext } from '../../context/app-context-provider';
import { MediaSizeName, useMediaSize } from '../../hooks/use-media-size';
import icssVars from '../../styles/export.icss.scss';

export const Contents: FC = ({ children }) => {
  const { isSidebarOpen } = useContext(AppContext);
  const mediaSize = useMediaSize();

  const isLageScreen =
    mediaSize === MediaSizeName.xxl ||
    mediaSize === MediaSizeName.xl ||
    mediaSize === MediaSizeName.lg;

  const marginLeft =
    isLageScreen && isSidebarOpen
      ? `${Number.parseFloat(icssVars.sidebarWidth)}px`
      : 0;

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
