import { useContext } from 'react';
import { RangeSlider } from '../slider/range-slider';
import { ImgColumnContext } from '../../context/ImgColumnContext';

export const ImageColumnsSetting = () => {
  const { columns, setColumns } = useContext(ImgColumnContext);

  const handleChange = (value: number) => {
    setColumns(value);
    // LocalStorageUtils.save('imageColumns', value.toString());
  };

  return (
    <RangeSlider
      name="columns"
      label="Image columns:"
      showValueInLabel
      value={columns}
      changeEvent={handleChange}
      min={1}
      max={16}
    />
  );
};
