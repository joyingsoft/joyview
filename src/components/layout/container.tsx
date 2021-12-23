import { FC, useContext, useEffect, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../../context/app-context-provider';

export const Container: FC = ({ children }) => {
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
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
      {children}
    </div>
  );
};
