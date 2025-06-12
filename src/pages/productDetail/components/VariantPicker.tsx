export interface VariantPickerProps<T> {
  title: string;
  variants: T[];
  value: T;
  onChange: (variant: T) => void;
}

export function VariantPicker<T extends { name: string }>(props: VariantPickerProps<T>) {
  return (
    <div className="pb-2 space-y-2 px-4">
      <div className="text-base font-medium text-inactive">{props.title}</div>
      <div className="flex overflow-x-auto space-x-2">
        {props.variants.map((variant, index) => {
          const selected = props.value === variant;
          return (
            <div
              key={index}
              className={`flex-none px-2 h-9 min-w-[64px] rounded-lg border text-xs cursor-pointer flex justify-center items-center ${
                selected
                  ? 'border-primary text-primary font-semibold'
                  : 'border-gray-300 text-gray-600'
              }`}
              onClick={() => props.onChange(variant)}
            >
              <div className="truncate">{variant.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
