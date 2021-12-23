import { FC, useContext } from 'react';
import { AppContext } from '../../context/app-context-provider';

export const Contents: FC = ({ children }) => {
  const { isSidebarOpen } = useContext(AppContext);

  return (
    <div className={`contents${isSidebarOpen ? ' contents__r' : ''}`}>
      {children}
    </div>
  );
};
