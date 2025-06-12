import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Icon } from 'zmp-ui';

const SWIPE_TO_DELETE_OFFSET = 80;

export const SwipeToDelete: React.FC<{
  onDelete: () => void;
  children: React.ReactNode;
}> = ({ onDelete, children }) => {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(
    ({ last, offset: [ox] }) => {
      if (last) {
        api.start({ x: ox < -SWIPE_TO_DELETE_OFFSET ? -SWIPE_TO_DELETE_OFFSET : 0 });
      } else {
        api.start({ x: Math.min(ox, 0), immediate: true });
      }
    },
    {
      from: () => [x.get(), 0],
      axis: 'x',
      bounds: { left: -100, right: 0 },
      rubberband: true,
      preventScroll: true,
    },
  );

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 bottom-0 w-20 py-px">
        <div
          className="bg-danger text-white/95 w-full h-full flex flex-col space-y-1 justify-center items-center cursor-pointer"
          onClick={onDelete}
        >
          <Icon icon="zi-delete" />
          <div className="text-2xs font-medium">Xoá</div>
        </div>
      </div>
      <animated.div {...bind()} style={{ x }} className="relative">
        {children}
      </animated.div>
    </div>
  );
};
