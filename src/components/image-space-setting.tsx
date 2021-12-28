import { FC, useContext } from 'react';
import { AppSpaceContext } from '../context/app-space-provider';
import { RangeSlider } from './slider/range-slider';

export const ImageSpaceSetting: FC = () => {
  const { imagePaddingPx, changeImagePaddingEvent } =
    useContext(AppSpaceContext);

  return (
    <RangeSlider
      name="imageSpacing"
      label="Image spacing:"
      showValueInLabel
      labelValuePostfix="px"
      value={imagePaddingPx}
      changeEvent={changeImagePaddingEvent}
      max={64}
    />
  );
};
