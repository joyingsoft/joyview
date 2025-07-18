import { type FC, memo, type ReactNode } from 'react';

export const MasonryVerticalItems: FC<{
  childrenInColumns: ReactNode[][];
  classNames: string;
}> = memo(({ childrenInColumns, classNames }) => {
  return (
    <>
      {childrenInColumns.map((items, i) => (
        <div
          className={classNames}
          style={{ width: `${100 / childrenInColumns.length}%` }}
          key={`c-${i}`}
        >
          {items}
        </div>
      ))}
    </>
  );
});
