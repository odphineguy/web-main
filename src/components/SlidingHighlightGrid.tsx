"use client";

import React, { useRef, useState, useEffect, useCallback, ReactNode } from "react";

interface SlidingHighlightGridProps {
  children: ReactNode;
  className?: string;
  highlightClassName?: string;
  /** Number of columns at different breakpoints for proper grid calculation */
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

interface HighlightStyle {
  opacity: number;
  width: number;
  height: number;
  transform: string;
}

export default function SlidingHighlightGrid({
  children,
  className = "",
  highlightClassName = "",
}: SlidingHighlightGridProps) {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [highlightStyle, setHighlightStyle] = useState<HighlightStyle>({
    opacity: 0,
    width: 0,
    height: 0,
    transform: "translate(0px, 0px)",
  });
  const [isHovering, setIsHovering] = useState(false);

  const snapHighlightToIndex = useCallback((index: number) => {
    const container = gridContainerRef.current;
    const el = itemRefs.current[index];
    if (!container || !el) return;

    const containerRect = container.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const x = rect.left - containerRect.left + container.scrollLeft;
    const y = rect.top - containerRect.top + container.scrollTop;

    setHighlightStyle({
      opacity: 1,
      width: rect.width,
      height: rect.height,
      transform: `translate(${x}px, ${y}px)`,
    });
  }, []);

  const handleMouseEnter = useCallback(
    (index: number) => {
      setIsHovering(true);
      snapHighlightToIndex(index);
    },
    [snapHighlightToIndex]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  // Clone children and attach refs and event handlers
  const childrenArray = React.Children.toArray(children);
  const enhancedChildren = childrenArray.map((child, index) => {
    if (!React.isValidElement(child)) return child;

    return (
      <div
        key={index}
        ref={(el) => {
          itemRefs.current[index] = el;
        }}
        onMouseEnter={() => handleMouseEnter(index)}
        onFocus={() => handleMouseEnter(index)}
        className="relative z-10 h-fit"
      >
        {child}
      </div>
    );
  });

  // Reset refs array when children change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, childrenArray.length);
  }, [childrenArray.length]);

  return (
    <div
      ref={gridContainerRef}
      className={`relative ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sliding hover highlight */}
      <div
        className={`pointer-events-none absolute rounded-2xl transition-all duration-200 ease-out will-change-transform ${
          isHovering
            ? "shadow-[0_12px_30px_rgba(249,115,22,0.25)]"
            : "shadow-none"
        } ${highlightClassName}`}
        style={{
          background:
            "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(255,255,255,0.5))",
          border: "1px solid rgba(249,115,22,0.3)",
          opacity: highlightStyle.opacity,
          width: highlightStyle.width,
          height: highlightStyle.height,
          transform: highlightStyle.transform,
        }}
      />
      {enhancedChildren}
    </div>
  );
}

