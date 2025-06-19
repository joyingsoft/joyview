import {
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import { Icon } from '@iconify/react';
import { AppContext } from '../../context/AppContext';

export const Container = ({ children }: { children: ReactNode }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
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

  const barsClickHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsSidebarOpen(true);
  };
  return (
    <div className="container">
      {!open && (
        <div className="bars p-lg" role="button" onClick={barsClickHandler}>
          <Icon icon="ic:baseline-menu" className="icon icon-lg" />
        </div>
      )}
      {children}
    </div>
  );
};
