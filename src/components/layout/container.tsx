import { useContext, useEffect, useState, type ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { AppContext } from '../../context/AppContext';

export const Container = ({ children }: { children: ReactNode }) => {
  const { isSidebarOpen, sidebarOpenEvent } = useContext(AppContext);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isSidebarOpen) {
      setTimeout(() => {
        setOpen(isSidebarOpen);
      }, 350);
    } else {
      setOpen(isSidebarOpen);
    }
  }, [isSidebarOpen]);

  return (
    <div className="container">
      {!open && (
        <div
          className="bars p-lg"
          role="button"
          onClick={() => sidebarOpenEvent && sidebarOpenEvent(true)}
        >
          <Icon icon="ic:baseline-menu" className="icon icon-lg" />
        </div>
      )}
      {children}
    </div>
  );
};
