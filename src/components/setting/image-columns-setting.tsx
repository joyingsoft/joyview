import { FC, useContext } from 'react';
import { AppImgColumnsContext } from '../../context/app-img-cols-provider';
import { RangeSlider } from '../slider/range-slider';

export const ImageColumnsSetting: FC = () => {
  const { columns, columnsEvent } = useContext(AppImgColumnsContext);

  return (
    <RangeSlider
      name="columns"
      label="Image columns:"
      showValueInLabel
      value={columns}
      changeEvent={columnsEvent}
      min={1}
      max={16}
    />
  );
};
