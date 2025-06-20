import React from 'react';
import { MdCircularProgress } from './circular-progress/md-circular-progress';

export interface MdButtonProps {
  type?: 'filled' | 'outlined' | 'text';
  disabled?: boolean;
  icon?: React.ReactNode;
  /**
   * Set to true if has icon in children
   */
  hasIcon?: boolean;
  isLoading?: boolean;
}

export const MdButton = ({
  type = 'filled',
  disabled = false,
  hasIcon = false,
  isLoading = false,
  icon,
  children,
  ...props
}: MdButtonProps & React.HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`button btn btn-${type} ${
        !!icon || hasIcon ? 'btn-icon' : ''
      } ${disabled ? 'btn-disabled' : ''}`}
    >
      {isLoading && <MdCircularProgress />}
      {!isLoading && (
        <>
          {icon && { icon }}
          {children}
        </>
      )}
    </button>
  );
};
