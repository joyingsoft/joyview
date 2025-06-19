import { useContext } from 'react';
import { RangeSlider } from '../slider/range-slider';
import { ImgSpaceContext } from '../../context/ImgSpaceContext';
import { LocalStorageUtils } from '../../utils/local-storage';

export const ImageSpaceSetting = () => {
  const { imageSpace, setImageSpace } = useContext(ImgSpaceContext);

  const handleChange = (value: number) => {
    setImageSpace(value);
    LocalStorageUtils.save('imageSpace', value.toString());
  };
  return (
    <RangeSlider
      name="imageSpacing"
      label="Image spacing:"
      showValueInLabel
      labelValuePostfix="px"
      value={imageSpace}
      changeEvent={handleChange}
      min={0}
      max={64}
    />
  );
};
