import React, { FC } from 'react';

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

export const MdButton: FC<
  MdButtonProps & React.HTMLProps<HTMLButtonElement>
> = ({
  type = 'filled',
  disabled = false,
  hasIcon = false,
  isLoading = false,
  icon,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`btn btn-${type} ${!!icon || hasIcon ? 'btn-icon' : ''} ${
        disabled ? 'btn-disabled' : ''
      }`}
    >
      {isLoading && <>loading</>}
      {!isLoading && (
        <>
          {icon && { icon }}
          {children}
        </>
      )}
    </button>
  );
};
