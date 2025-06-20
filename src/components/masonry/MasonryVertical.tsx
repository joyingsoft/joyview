import React, { useContext } from 'react';
import { AppImgContext } from '../../context/AppImgContext';
import {
  mediaSizeNames,
  useMediaSize,
  type MediaSizeName,
} from '../../hooks/use-media-size';
import { MasonryFlexbox } from './MasonryFlexbox';
import { ImgSpaceContext } from '../../context/ImgSpaceContext';

type MasonryVerticalProps = {
  columns?: number;
  mediaSizeCols?: Map<MediaSizeName | string, number>;
  classNames?: string;
  columnClassNames?: string;
  cssProps?: React.CSSProperties;
  children?: React.ReactNode;
  onItemClick?: (index: number) => void;
};

export const MasonryVertical = ({
  columns,
  mediaSizeCols = new Map<MediaSizeName | string, number>(
    mediaSizeNames.map((name, index) => [name, index + 1]),
  ),
  classNames = 'masonry-v',
  cssProps,
  children,
  onItemClick = () => {},
}: MasonryVerticalProps) => {
  const mediaSizeName = useMediaSize();
  const { imageFiles } = useContext(AppImgContext);
  const { imageSpace } = useContext(ImgSpaceContext);
  const columnCount = columns || mediaSizeCols.get(mediaSizeName) || 3;

  if (!imageFiles || imageFiles.length === 0) {
    return (
      <div className={classNames} style={cssProps}>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          📂 No images to display
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames}
      style={{ padding: `${imageSpace}px`, ...cssProps }}
    >
      <MasonryFlexbox
        items={imageFiles}
        columns={columnCount}
        onItemClick={onItemClick}
        itemsPerBatch={24}
      />
      {children}
    </div>
  );
};
