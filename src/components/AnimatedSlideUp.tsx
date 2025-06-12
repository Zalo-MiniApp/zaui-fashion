// components/AnimatedSlideUp.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimatedSlideUpProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export const AnimatedSlideUp = ({
  children,
  delay = 0,
  duration = 0.4,
  className,
}: AnimatedSlideUpProps) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
