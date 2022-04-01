import React, { FC, memo } from 'react';
import { MasonryVerticalColumnsChild } from './masonry-types';
import './masonry-vertical.scss';

export const MasonryVerticalColumns: FC<{
  childrenInColumns: MasonryVerticalColumnsChild[][];
  classNames: string;
}> = memo(({ childrenInColumns, classNames }) => {
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
});
