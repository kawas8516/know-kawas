"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProps extends Omit<HTMLMotionProps<"span">, "children"> {
  /** The text to display in the logo */
  text?: string
  /** Additional classes for the container */
  className?: string
  /** Size variant for the logo */
  size?: "sm" | "md" | "lg" | "xl"
  /** Whether to disable the entrance animation */
  disableAnimation?: boolean
  /** Custom aria-label for accessibility */
  ariaLabel?: string
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-5xl",
}

export function Logo({
  text = "Logo",
  className,
  size = "md",
  disableAnimation = false,
  ariaLabel,
  ...props
}: LogoProps) {
  const animationProps = disableAnimation
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
      }

  return (
    <motion.span
      role="img"
      aria-label={ariaLabel || `${text} logo`}
      className={cn(
        // Base styles
        "inline-block font-bold",
        // Gradient text using Tailwind
        "bg-gradient-to-r from-violet-500 to-cyan-500",
        "bg-clip-text text-transparent",
        // Size variant
        sizeClasses[size],
        className,
      )}
      {...animationProps}
      {...props}
    >
      {text}
    </motion.span>
  )
}
