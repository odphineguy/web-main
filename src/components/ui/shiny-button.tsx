"use client";

"use client";

import React from "react";
import { motion, type AnimationProps } from "framer-motion";

import { cn } from "@/lib/utils";

const animationProps: AnimationProps = {
  initial: { "--x": "100%", scale: 0.98 } as React.CSSProperties,
  animate: { "--x": "-120%", scale: 1 } as React.CSSProperties,
  whileTap: { scale: 0.97 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1.2,
    type: "spring",
    stiffness: 35,
    damping: 14,
    mass: 1.2,
    scale: {
      type: "spring",
      stiffness: 180,
      damping: 6,
      mass: 0.6,
    },
  },
};

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      {...animationProps}
      {...props}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center rounded-full font-semibold text-white",
        "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
        "shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out",
        className
      )}
    >
      <span className="relative block w-full text-inherit">{children}</span>
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.15)_calc(var(--x)+20%),rgba(255,255,255,0.35)_calc(var(--x)+25%),rgba(255,255,255,0.15)_calc(var(--x)+100%))]"
        style={{
          maskImage:
            "linear-gradient(-75deg, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 70%)",
        }}
      />
    </motion.button>
  );
};

export default { ShinyButton };
