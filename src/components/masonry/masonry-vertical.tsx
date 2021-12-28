import React, { FC, ReactNode } from 'react';
import { MediaSizeName, useMediaSize } from '../../hooks/use-media-size';
import { MasonryVerticalColumns } from './masonry-vertical-columns';
import './masonry-vertical.scss';

const DEFAULT_COLUMNS = 1;

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
   * Number of columns to render.
   * Default undefind. `mediaSizeCols` will be used if not defined.
   */
  columns?: number;

  /**
   * Used when `columns` are not defined.
   * Number of columns at each Media size.
   * Default values will be used, if not defined.
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

  cssProps?: React.CSSProperties;

  children: ReactNode;
}> = ({
  columns,
  mediaSizeCols = new Map<MediaSizeName | string, number>(
    Object.values(MediaSizeName).map((name, index) => [name, index + 1]),
  ),
  classNames = 'masonry-v',
  columnClassNames = 'masonry-v__c',
  cssProps,
  children,
}) => {
  const mediaSizeName = useMediaSize();

  return (
    <div className={classNames} style={cssProps}>
      <MasonryVerticalColumns
        childrenInColumns={getChildrenInColumns(
          columns || mediaSizeCols.get(mediaSizeName) || DEFAULT_COLUMNS,
          children,
        )}
        classNames={columnClassNames}
      />
    </div>
  );
};
