import { FC } from 'react';
import './range-slider.scss';

export const RangeSlider: FC<{
  name: string;
  label?: string;
  showValueInLabel?: boolean;
  labelValuePostfix?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  changeEvent?: (value: number) => void;
}> = ({
  name,
  label = '',
  showValueInLabel,
  labelValuePostfix = '',
  min = 0,
  max = 100,
  value = 0,
  step = 1,
  changeEvent,
}) => {
  return (
    <div className="range-slider p-md">
      <label>
        {label}
        {showValueInLabel && (
          <small>
            {' '}
            {value} {labelValuePostfix}
          </small>
        )}
      </label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => changeEvent && changeEvent(Number(e.target.value))}
      />
    </div>
  );
};
