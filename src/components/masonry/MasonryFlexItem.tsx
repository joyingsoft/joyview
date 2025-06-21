import React, { useCallback, useContext } from 'react';
import { FileToImg } from '../FileToImg';
import { ImgSpaceContext } from '../../context/ImgSpaceContext';
import { useIsElementVisible } from '../../hooks/use-is-element-visible';

interface MasonryFlexItemProps {
  file: File;
  index: number;
  onItemClick: (index: number) => void;
  isVisible: boolean;
}

export const MasonryFlexItem = React.memo(
  ({ file, index, onItemClick, isVisible }: MasonryFlexItemProps) => {
    const { imageSpace } = useContext(ImgSpaceContext);
    const { elementRef, hasBeenVisible } = useIsElementVisible<HTMLDivElement>({
      rootMargin: '300px',
    });

    const handleClick = useCallback(() => {
      onItemClick(index);
    }, [index, onItemClick]);

    if (!isVisible) return null;

    return (
      <div
        ref={elementRef}
        style={{
          margin: `${imageSpace}px`,
          cursor: 'pointer',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
        onClick={handleClick}
      >
        {hasBeenVisible ? (
          <FileToImg file={file} priority={index < 12} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              fontSize: '14px',
            }}
          >
            •••
          </div>
        )}
      </div>
    );
  },
);
