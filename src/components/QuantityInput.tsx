import { Button } from 'zmp-ui';
import { MinusIcon, PlusIcon } from './Vectors';
import { useEffect, useState } from 'react';

export interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  minValue?: number;
}

export default function QuantityInput(props: QuantityInputProps) {
  const [localValue, setLocalValue] = useState(String(props.value));

  useEffect(() => {
    setLocalValue(String(props.value));
  }, [props.value]);

  return (
    <div className="w-full flex items-center">
      <Button
        size="small"
        variant="tertiary"
        className="min-w-0 aspect-square"
        onClick={() => props.onChange(Math.max(props.minValue ?? 0, props.value - 1))}
      >
        <MinusIcon width={14} height={14} />
      </Button>
      <input
        style={{ width: `calc(${String(props.value).length}ch + 16px)` }}
        className="flex-1 text-center font-medium text-xs px-2 focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        inputMode="numeric"
        value={localValue}
        onChange={(e) => setLocalValue(e.currentTarget.value)}
        onBlur={() => props.onChange(Math.max(props.minValue ?? 0, Number(localValue)))}
      />
      <Button
        size="small"
        variant="tertiary"
        className="min-w-0 aspect-square"
        onClick={() => props.onChange(props.value + 1)}
      >
        <PlusIcon width={14} height={14} />
      </Button>
    </div>
  );
}
