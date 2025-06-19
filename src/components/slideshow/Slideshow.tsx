import { useEffect } from 'react';
import { FileImg } from './FileImg';
import { IconBtn } from './IconBtn';
import { Modal } from './Modal';

type Props = {
  file?: File;
  onClose?: () => void;
  onFileChange: (isNext: boolean) => void;
};
export function Slideshow({ onClose, file, onFileChange }: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        onFileChange(true);
      } else if (event.key === 'ArrowLeft') {
        onFileChange(false);
      }
    };

    if (file) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [file, onFileChange]);

  return (
    <Modal show={!!file} onClose={onClose}>
      <IconBtn
        icon="mingcute:right-fill"
        className="right"
        onClick={() => onFileChange(true)}
      />
      <IconBtn
        icon="mingcute:left-fill"
        className="left"
        onClick={() => onFileChange(false)}
      />
      <div className="slideshow">{file && <FileImg file={file} />}</div>
    </Modal>
  );
}
