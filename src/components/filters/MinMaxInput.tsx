import React from "react";

interface MinMaxInputProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
}

const MinMaxInput: React.FC<MinMaxInputProps> = ({
  min,
  max,
  value,
  onChange,
  minLabel = "Min",
  maxLabel = "Max",
  className = "",
}) => (
  <div className={`inline-flex items-start gap-[24px] ${className}`}>
    <div className="flex w-[140px] items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
      <input
        type="number"
        min={min}
        max={value[1]}
        value={value[0]}
        onChange={e => {
          const newMin = Number(e.target.value);
          onChange([newMin, value[1]]);
        }}
        className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
        aria-label={minLabel}
      />
    </div>
    <div className="flex w-[140px] items-center justify-center gap-2 p-2 relative bg-[var(--dark-theme-color)] rounded-lg">
      <input
        type="number"
        min={value[0]}
        max={max}
        value={value[1]}
        onChange={e => {
          const newMax = Number(e.target.value);
          onChange([value[0], newMax]);
        }}
        className="outline-none w-full h-full bg-[var(--dark-theme-color)] text-center"
        aria-label={maxLabel}
      />
    </div>
  </div>
);

export default MinMaxInput;