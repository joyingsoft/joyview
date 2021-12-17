import React, { FC, ReactNode, useEffect, useState } from 'react';
import { mediaQueryBreakpoints } from '../../hooks/use-breakpoint';
import './react-masonry-vertical.scss';

type BreakpointValue = number;
type NumberOfColumns = number;

type Props = {
  /**
   * Number of columns at each breakpoint (px).
   */
  breakpointCols?: Map<BreakpointValue, NumberOfColumns>;

  /**
   * ReactMasonryVertical container class names.
   */
  classNames?: string;

  /**
   * ReactMasonryVertical sub div (column) class names
   */
  columnClassNames?: string;

  children: ReactNode;
};

const DEFAULT_COLUMNS = 1;

const getDefaultBreakpointCols = () => {
  const map = new Map<BreakpointValue, NumberOfColumns>();
  map.set(mediaQueryBreakpoints.sm, 2);
  map.set(mediaQueryBreakpoints.md, 3);
  map.set(mediaQueryBreakpoints.lg, 4);
  map.set(mediaQueryBreakpoints.xl, 5);
  return map;
};

const ReactMasonryVerticalColumns: FC<{
  childrenInColumns: (
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
  )[][];
  classNames: string;
}> = ({ childrenInColumns, classNames }) => {
  const columnWidth = `${100 / childrenInColumns.length}%`;

  return (
    <>
      {childrenInColumns.map((items, i) => (
        <div className={classNames} style={{ width: columnWidth }} key={i}>
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

export const ReactMasonryVertical: FC<Props> = ({
  breakpointCols = getDefaultBreakpointCols(),
  classNames = 'masonry-v',
  columnClassNames = 'masonry-v__c',
  children,
}) => {
  const [showCols, setShowCols] = useState<number>(DEFAULT_COLUMNS);

  const resetShowCols = () => {
    let columns = DEFAULT_COLUMNS;
    let breakpoint = 0;

    for (let [bp, c] of breakpointCols.entries()) {
      if (window.innerWidth >= bp && bp > breakpoint) {
        breakpoint = bp;
        columns = c || DEFAULT_COLUMNS;
      }
    }

    if (showCols !== columns) {
      setShowCols(columns);
    }
  };

  useEffect(() => {
    resetShowCols();

    if (window) {
      window.addEventListener('resize', resetShowCols);
    }
    return () => {
      if (window) {
        window.removeEventListener('resize', resetShowCols);
      }
    };
  }, [children]);

  return (
    <div className={classNames}>
      <ReactMasonryVerticalColumns
        childrenInColumns={getChildrenInColumns(showCols, children)}
        classNames={columnClassNames}
      />
    </div>
  );
};
