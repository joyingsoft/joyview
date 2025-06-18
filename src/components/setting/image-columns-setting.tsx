import { useContext } from 'react';
import { RangeSlider } from '../slider/range-slider';
import { ImgColumnContext } from '../../context/ImgColumnContext';

export const ImageColumnsSetting = () => {
  const { columns, setColumns } = useContext(ImgColumnContext);

  return (
    <RangeSlider
      name="columns"
      label="Image columns:"
      showValueInLabel
      value={columns}
      changeEvent={setColumns}
      min={1}
      max={16}
    />
  );
};
