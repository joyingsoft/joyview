import React from 'react';

import './md-circular-progress.scss';

export const MdCircularProgress = ({
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="md-circular-progress"
      viewBox="0 0 66 66"
      {...props}
    >
      <circle
        className="md-circular-progress__circle"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  );
};
