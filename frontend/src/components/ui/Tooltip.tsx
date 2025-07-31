"use client";

import React, { useState, useRef, useEffect } from "react";
import Portal from "./Portal";
import { cn } from "@/utils/cn";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  offset?: number;
  position?: "top" | "bottom" | "left" | "right";
};

const Tooltip = ({
  content,
  children,
  offset = 8,
  position = "bottom",
}: TooltipProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [currentPos, setCurrentPos] = useState(position);

  const calculatePosition = () => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const target = wrapperRef.current.getBoundingClientRect();
    const tip = tooltipRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const positions: Record<
      "top" | "bottom" | "left" | "right",
      { fits: boolean; top: number; left: number }
    > = {
      right: {
        fits: target.right + offset + tip.width <= vw,
        top: target.top + target.height / 2 - tip.height / 2,
        left: target.right + offset,
      },
      bottom: {
        fits: target.bottom + offset + tip.height <= vh,
        top: target.bottom + offset,
        left: target.left + target.width / 2 - tip.width / 2,
      },
      top: {
        fits: target.top - offset - tip.height >= 0,
        top: target.top - tip.height - offset,
        left: target.left + target.width / 2 - tip.width / 2,
      },
      left: {
        fits: target.left - offset - tip.width >= 0,
        top: target.top + target.height / 2 - tip.height / 2,
        left: target.left - tip.width - offset,
      },
    };

    let chosenPos = position;
    if (!positions[position].fits) {
      const fallback = (
        Object.keys(positions) as Array<keyof typeof positions>
      ).find((pos) => positions[pos].fits);
      chosenPos = fallback ?? position;
    }

    const { top: rawTop, left: rawLeft } = positions[chosenPos];

    const top = Math.max(5, Math.min(rawTop, vh - tip.height - 5));
    const left = Math.max(5, Math.min(rawLeft, vw - tip.width - 5));

    setCoords({ top, left });
    setCurrentPos(chosenPos);
  };

  useEffect(() => {
    if (!visible) return;

    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", calculatePosition, { passive: true });

    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition);
    };
  }, [visible, position, offset, calculatePosition]);

  return (
    <>
      <div
        ref={wrapperRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        // className="inline-block"
      >
        {children}
      </div>

      <Portal>
        <div
          ref={tooltipRef}
          className={cn(
            "fixed px-space-md py-space-xs bg-bg-light text-16 text-sm rounded shadow z-50 pointer-events-none border border-border-muted duration-300 text-text-muted",
            visible ? "opacity-100" : "opacity-0"
          )}
          style={{ top: coords.top, left: coords.left }}
          data-position={currentPos}
        >
          {content}
        </div>
      </Portal>
    </>
  );
};

export default Tooltip;
