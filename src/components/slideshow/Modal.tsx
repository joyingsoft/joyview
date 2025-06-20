import { useEffect, useRef } from 'react';
import { IconBtn } from './IconBtn';

type Props = {
  show?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDialogElement>) => void;
};

export function Modal({ show, onClose, children, onClick }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) {
      if (ref.current) {
        ref.current.showModal();
      }
    } else {
      if (ref.current) {
        ref.current.close();
      }
    }
  }, [show]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <dialog ref={ref} onClose={handleClose} className="modal" onClick={onClick}>
      <IconBtn
        icon="material-symbols:close-small-rounded"
        className="close"
        onClick={handleClose}
      />
      {children}
    </dialog>
  );
}
