import { useState, useEffect, useCallback, useRef } from 'react';
import { MasonryFlexItem } from './MasonryFlexItem';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';

interface MasonryFlexboxProps {
  items: File[];
  columns: number;
  onItemClick: (index: number) => void;
  itemsPerBatch?: number;
}

export const MasonryFlexbox = ({
  items,
  columns,
  onItemClick,
  itemsPerBatch = 30,
}: MasonryFlexboxProps) => {
  const [loadedItems, setLoadedItems] = useState(itemsPerBatch);
  const [columnItems, setColumnItems] = useState<File[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  // Initialize columns
  useEffect(() => {
    const newColumns: File[][] = Array(columns)
      .fill(null)
      .map(() => []);
    const visibleItems = items.slice(0, loadedItems);

    // Distribute items to columns in round-robin fashion initially
    // This gives better balance than always choosing "shortest" column
    visibleItems.forEach((item, index) => {
      const targetColumn = index % columns;
      newColumns[targetColumn].push(item);
    });

    setColumnItems(newColumns);
  }, [items, columns, loadedItems]);

  // Load more items when scrolling near bottom
  const { elementRef: loadMoreRef } = useIntersectionObserver({
    rootMargin: '200px',
    threshold: 0.1,
  });

  const loadMoreItems = useCallback(() => {
    if (loadedItems < items.length) {
      setLoadedItems((prev) => Math.min(prev + itemsPerBatch, items.length));
    }
  }, [loadedItems, items.length, itemsPerBatch]);

  // Trigger load more when intersection
  useEffect(() => {
    loadMoreItems();
  }, [loadMoreRef]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      {columnItems.map((columnFiles, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0, // Prevent flex item from overflowing
          }}
        >
          {columnFiles.map((file) => {
            const globalIndex = items.indexOf(file);
            return (
              <MasonryFlexItem
                key={globalIndex}
                file={file}
                index={globalIndex}
                onItemClick={onItemClick}
                isVisible={globalIndex < loadedItems}
              />
            );
          })}
        </div>
      ))}

      {/* Load more trigger */}
      {loadedItems < items.length && (
        <div
          ref={loadMoreRef}
          style={{
            position: 'absolute',
            bottom: '100px',
            left: 0,
            width: '100%',
            height: '1px',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
