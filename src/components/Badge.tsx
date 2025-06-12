import { PropsWithChildren } from 'react';

function Badge(props: PropsWithChildren<{ value: number; style?: React.CSSProperties }>) {
  return (
    <div className="relative">
      {props.value > 0 && (
        <div
          className="absolute -top-1 left-3.5 h-4 min-w-4 flex justify-center items-center rounded-full bg-danger text-white text-[10px] font-medium shadow-[0_0_0_2px_white]"
          style={props.style}
        >
          {props.value > 9 ? '9+' : props.value}
        </div>
      )}
      {props.children}
    </div>
  );
}

export default Badge;
