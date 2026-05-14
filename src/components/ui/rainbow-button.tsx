"use client";

import { motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  colors?: string[];
  duration?: number;
  borderWidth?: number;
  animated?: boolean;
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ children, colors = ["#6c63ff", "#ff6b9d", "#00d4aa", "#ffa726", "#6c63ff"], duration = 2, borderWidth = 2, animated = true, className, ...props }, ref) => {
    const gradientColors = colors.join(", ");

    return (
      <button
        ref={ref}
        type="button"
        className={cn("relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition-transform hover:scale-105 active:scale-95", className)}
        style={{ padding: borderWidth }}
        {...props}
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: `linear-gradient(var(--gradient-angle, 0deg), ${gradientColors})` }}
          animate={animated ? { "--gradient-angle": ["0deg", "360deg"] } as never : undefined}
          transition={animated ? { duration, repeat: Infinity, ease: "linear" } : undefined}
        />
        <span
          className="relative z-10 flex items-center gap-2 px-8 py-3 font-semibold text-sm"
          style={{
            borderRadius: `calc(9999px - ${borderWidth}px)`,
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        >
          {children}
        </span>
      </button>
    );
  }
);
RainbowButton.displayName = "RainbowButton";

export { RainbowButton };
