import { useCallback, useEffect } from 'react';
import { useIsElementVisible } from '../../../hooks/use-is-element-visible';

export function MasonryVerticalColumn({
  onLoadMore,
  onImgClick,
  haveMore,
  files,
  columns,
  imageSpace,
}: {
  onLoadMore: () => void;
  onImgClick: (key: string) => void;
  haveMore: boolean;
  files: File[];
  columns: number;
  imageSpace: number;
}) {
  const { elementRef, isVisible } = useIsElementVisible<HTMLDivElement>();

  useEffect(() => {
    if (isVisible && haveMore && files.length == 0) {
      onLoadMore();
    }
  }, [isVisible, onLoadMore, haveMore, files.length]);

  const handleOnload = useCallback(() => {
    if (isVisible && haveMore) {
      onLoadMore();
    }
  }, [isVisible, onLoadMore, haveMore]);

  return (
    <div className="masonry-v__c" style={{ width: `${100 / columns}%` }}>
      {files.map((file) => (
        <div
          onClick={() => onImgClick(file.name)}
          key={file.name}
          style={{ margin: `${imageSpace}px` }}
        >
          <img
            src={URL.createObjectURL(file)}
            onLoad={handleOnload}
            alt={file.name}
          />
        </div>
      ))}
      <div className="load-more" ref={elementRef} />
    </div>
  );
}
