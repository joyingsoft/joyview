import React, { FC } from 'react';
import './masonry-vertical.scss';

export const MasonryVerticalColumns: FC<{
  childrenInColumns: (
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
  )[][];
  classNames: string;
}> = ({ childrenInColumns, classNames }) => {
  return (
    <>
      {childrenInColumns.map((items, i) => (
        <div
          className={classNames}
          style={{ width: `${100 / childrenInColumns.length}%` }}
          key={`c-${i}`}
        >
          {items}
        </div>
      ))}
    </>
  );
};
