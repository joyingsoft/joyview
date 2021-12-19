import React, { FC, ReactNode } from 'react';
import { MediaSizeName, useMediaSize } from '../../hooks/use-media-size';
import './masonry-vertical.scss';

const DEFAULT_COLUMNS = 1;

const MasonryVerticalColumns: FC<{
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
          key={i}
        >
          {items}
        </div>
      ))}
    </>
  );
};

const getChildrenInColumns = (columns: number, children: React.ReactNode) => {
  const columnsChildren = new Array<
    (React.ReactChild | React.ReactFragment | React.ReactPortal)[]
  >(columns);

  const childrenArray = React.Children.toArray(children);

  for (let i = 0; i < childrenArray.length; i++) {
    const colIndex = i % columns;

    if (!columnsChildren[colIndex]) {
      columnsChildren[colIndex] = [];
    }

    columnsChildren[colIndex].push(childrenArray[i]);
  }

  return columnsChildren;
};

export const MasonryVertical: FC<{
  /**
   * Number of columns at each Media size.
   */
  mediaSizeCols?: Map<MediaSizeName | string, number>;

  /**
   * ReactMasonryVertical container class names.
   */
  classNames?: string;

  /**
   * ReactMasonryVertical sub div (column) class names
   */
  columnClassNames?: string;

  children: ReactNode;
}> = ({
  mediaSizeCols = new Map<MediaSizeName | string, number>(
    Object.values(MediaSizeName).map((name, index) => [name, index + 1]),
  ),
  classNames = 'masonry-v',
  columnClassNames = 'masonry-v__c',
  children,
}) => {
  const mediaSizeName = useMediaSize();

  return (
    <div className={classNames}>
      <MasonryVerticalColumns
        childrenInColumns={getChildrenInColumns(
          mediaSizeCols.get(mediaSizeName) || DEFAULT_COLUMNS,
          children,
        )}
        classNames={columnClassNames}
      />
    </div>
  );
};
