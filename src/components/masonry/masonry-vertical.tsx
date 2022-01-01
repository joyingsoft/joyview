import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { AppImgContext } from '../../context/app-img-provider';
import { MediaSizeName, useMediaSize } from '../../hooks/use-media-size';
import {
  DEFAULT_COLUMNS,
  getChildrenInColumns,
  getEqualizedChildrenInColumns,
} from '../../utils/masonry-utils';
import { MasonryVerticalColumns } from './masonry-vertical-columns';
import './masonry-vertical.scss';

type MasonryVerticalProps = {
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
};

export const MasonryVertical: FC<MasonryVerticalProps> = ({
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
  const { loadedImgs, hasAllRatios } = useContext(AppImgContext);

  const [newColumns, setNewColumns] = useState<
    (React.ReactChild | React.ReactFragment | React.ReactPortal)[][] | undefined
  >(undefined);

  const cic = getChildrenInColumns(
    columns || mediaSizeCols.get(mediaSizeName) || DEFAULT_COLUMNS,
    children,
  );

  useEffect(() => {
    if (hasAllRatios) {
      const optimized = getEqualizedChildrenInColumns(loadedImgs, cic);
      setNewColumns(optimized);
    }
    return () => {
      setNewColumns(undefined);
    };
  }, [hasAllRatios, mediaSizeName, columns]);

  return (
    <div className={classNames} style={cssProps}>
      <MasonryVerticalColumns
        childrenInColumns={newColumns || cic}
        classNames={columnClassNames}
      />
    </div>
  );
};
