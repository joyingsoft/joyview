import { FC, useEffect, useState } from 'react';

export const FileImage: FC<{ file: File; classNames?: string }> = ({
  file,
  classNames,
}) => {
  const [data, setData] = useState<string | undefined>(undefined);

  useEffect(() => {
    const resizeRate = 0.2;
    const imgFile = new Image();
    imgFile.src = URL.createObjectURL(file);

    imgFile.onload = () => {
      const oc = document.createElement('canvas');
      oc.height = imgFile.height * resizeRate;
      oc.width = imgFile.width * resizeRate;
      const octx = oc.getContext('2d');
      if (octx) {
        octx.drawImage(
          imgFile,
          0,
          0,
          imgFile.width * resizeRate,
          imgFile.height * resizeRate,
        );

        setData(oc.toDataURL(file.type));
      } else {
        console.log('An error has occurred!');
      }
    };
  }, [file]);

  if (data && file) {
    return <img className={classNames} src={data} alt={file.name} />;
  }

  return null;
};
