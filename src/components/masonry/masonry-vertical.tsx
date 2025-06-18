import React, { type ReactNode, useContext } from 'react';
import { AppImgContext } from '../../context/app-img-provider';
import {
  type MediaSizeName,
  mediaSizeNames,
  useMediaSize,
} from '../../hooks/use-media-size';
import {
  DEFAULT_COLUMNS,
  getEqualizedChildrenInColumns,
} from './masonry-utils';
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

export const MasonryVertical = ({
  columns,
  mediaSizeCols = new Map<MediaSizeName | string, number>(
    mediaSizeNames.map((name, index) => [name, index + 1]),
  ),
  classNames = 'masonry-v',
  columnClassNames = 'masonry-v__c',
  cssProps,
  children,
}: MasonryVerticalProps) => {
  const mediaSizeName = useMediaSize();
  const { loadedImgs, hasAllRatios } = useContext(AppImgContext);

  return (
    <div className={classNames} style={cssProps}>
      <MasonryVerticalColumns
        childrenInColumns={getEqualizedChildrenInColumns(
          columns || mediaSizeCols.get(mediaSizeName) || DEFAULT_COLUMNS,
          hasAllRatios,
          loadedImgs,
          children,
        )}
        classNames={columnClassNames}
      />
    </div>
  );
};
