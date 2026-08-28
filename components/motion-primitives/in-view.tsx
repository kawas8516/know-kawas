'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  type UseInViewOptions,
  type Variants,
  type Transition,
} from 'framer-motion';

export type InViewProps = {
  children: ReactNode;
  variants?: Variants;
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: keyof typeof motion;
  once?: boolean;
  className?: string;
};

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  viewOptions = { margin: '0px 0px -80px 0px' },
  as = 'div',
  once = true,
  className,
}: InViewProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { ...viewOptions, once });
  const reduce = useReducedMotion();

  const MotionComponent = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as as 'div';
    return (
      <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionComponent
      ref={ref as React.RefObject<HTMLDivElement>}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
