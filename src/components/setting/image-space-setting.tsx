import { useContext } from 'react';
import { RangeSlider } from '../slider/range-slider';
import { ImgSpaceContext } from '../../context/ImgSpaceContext';

export const ImageSpaceSetting = () => {
  const { imageSpace, setImageSpace } = useContext(ImgSpaceContext);

  return (
    <RangeSlider
      name="imageSpacing"
      label="Image spacing:"
      showValueInLabel
      labelValuePostfix="px"
      value={imageSpace}
      changeEvent={setImageSpace}
      min={0}
      max={64}
    />
  );
};
