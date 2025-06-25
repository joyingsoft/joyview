import { useContext, useMemo, type ReactNode } from 'react';
import {
  mediaSizeNames,
  useMediaSize,
  type MediaSizeName,
} from '../../../hooks/use-media-size';
import { ImgSpaceContext } from '../../../context/ImgSpaceContext';
import { ImgColumnContext } from '../../../context/ImgColumnContext';
import { AppImgContext } from '../../../context/AppImgContext';
import {
  DEFAULT_COLUMNS,
  getEqualizedChildrenInColumns,
} from '../masonry-utils';
import { MasonryVerticalItems } from './MasonryVerticalItems';

type Props = {
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

  children: ReactNode;
};

export function MasonryVerticalColumns({
  mediaSizeCols = new Map<MediaSizeName | string, number>(
    mediaSizeNames.map((name, index) => [name, index + 1]),
  ),
  classNames = 'masonry-v',
  columnClassNames = 'masonry-v__c',
  children,
}: Props) {
  const mediaSizeName = useMediaSize();
  const { imageSpace } = useContext(ImgSpaceContext);
  const { columns } = useContext(ImgColumnContext);
  const { loadedImgs, hasAllRatios } = useContext(AppImgContext);
  const childrenInColumns = useMemo(() => {
    const cols = columns || mediaSizeCols.get(mediaSizeName) || DEFAULT_COLUMNS;
    return getEqualizedChildrenInColumns(
      cols,
      hasAllRatios,
      loadedImgs,
      children,
    );
  }, [
    columns,
    mediaSizeCols,
    mediaSizeName,
    hasAllRatios,
    loadedImgs,
    children,
  ]);
  return (
    <div className={classNames} style={{ padding: `${imageSpace}px` }}>
      <MasonryVerticalItems
        childrenInColumns={childrenInColumns}
        classNames={columnClassNames}
      />
    </div>
  );
}
