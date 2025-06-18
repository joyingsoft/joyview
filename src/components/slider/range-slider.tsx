import { useEffect, useState } from 'react';
import './range-slider.scss';
type RangeSliderProps = {
  name: string;
  label?: string;
  showValueInLabel?: boolean;
  labelValuePostfix?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  changeEvent?: (value: number) => void;
};

export const RangeSlider = ({
  name,
  label = '',
  showValueInLabel,
  labelValuePostfix = '',
  min = 0,
  max = 100,
  value = 0,
  step = 1,
  changeEvent,
}: RangeSliderProps) => {
  const [current, setCurrent] = useState<number>(value);

  const present = ((current - min) * 100) / (max - min);

  useEffect(() => {
    if (value !== current) {
      setCurrent(value);
    }
  }, [value, current]);

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
        onChange={(e) => {
          const v = Number(e.target.value);
          setCurrent(v);
          if (changeEvent) {
            changeEvent(v);
          }
        }}
        style={{
          background: `linear-gradient(
          to right,
          var(--md-sys-color-primary) 0,
          var(--md-sys-color-primary) ${present}%,
          var(--md-sys-color-primary-container) ${present}%,
          var(--md-sys-color-primary-container) 100%
        )`,
        }}
      />
    </div>
  );
};
