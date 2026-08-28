'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export type PresetType = 'fade' | 'slide' | 'scale' | 'blur' | 'blur-slide';

export type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  variants?: { container?: Variants; item?: Variants };
  preset?: PresetType;
  as?: keyof typeof motion;
  asChild?: keyof typeof motion;
  inView?: boolean;
  delay?: number;
  stagger?: number;
};

const defaultContainerVariants: Variants = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  slide: { hidden: { y: 16 }, visible: { y: 0 } },
  scale: { hidden: { scale: 0.96 }, visible: { scale: 1 } },
  blur: { hidden: { filter: 'blur(6px)' }, visible: { filter: 'blur(0px)' } },
  'blur-slide': {
    hidden: { filter: 'blur(6px)', y: 16 },
    visible: { filter: 'blur(0px)', y: 0 },
  },
};

function addDefaults(v: Variants): Variants {
  return {
    hidden: { ...defaultItemVariants.hidden, ...v.hidden },
    visible: { ...defaultItemVariants.visible, ...v.visible },
  };
}

export function AnimatedGroup({
  children,
  className,
  variants,
  preset = 'blur-slide',
  as = 'div',
  asChild = 'div',
  inView = true,
  delay = 0,
  stagger = 0.06,
}: AnimatedGroupProps) {
  const reduce = useReducedMotion();

  const containerVariants: Variants = variants?.container ?? {
    ...defaultContainerVariants,
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const itemVariants: Variants = variants?.item ?? addDefaults(presetVariants[preset]);

  const MotionComponent = motion[as] as typeof motion.div;
  const MotionChild = motion[asChild] as typeof motion.div;

  if (reduce) {
    const Tag = as as 'div';
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionComponent
      initial="hidden"
      animate={inView ? undefined : 'visible'}
      whileInView={inView ? 'visible' : undefined}
      viewport={inView ? { once: true, margin: '0px 0px -80px 0px' } : undefined}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}
