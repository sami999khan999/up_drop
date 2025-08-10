"use client";

import { cn } from "@/utils/cn";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Portal from "./Portal";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  offset?: number;
};

const DEBOUNCE_MS = 50;
const VIEWPORT_PADDING = 8;

export default function Tooltip({
  content,
  children,
  offset = 0,
}: TooltipProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const calculatePosition = useCallback(() => {
    const tipRect = tooltipRef.current?.getBoundingClientRect();
    const elmRect = wrapperRef.current?.getBoundingClientRect();
    if (!tipRect || !elmRect) return;

    const { innerWidth: vw, innerHeight: vh } = window;
    const space = {
      top: elmRect.top,
      bottom: vh - elmRect.bottom,
      left: elmRect.left,
      right: vw - elmRect.right,
    };

    let top: number;
    let left: number;

    const fitsRight = space.right >= tipRect.width + offset;
    const fitsLeft = space.left >= tipRect.width + offset;
    const fitsBottom = space.bottom >= tipRect.height + offset;
    const fitsTop = space.top >= tipRect.height + offset;

    if (fitsRight) {
      left = elmRect.right + offset;
    } else if (fitsLeft) {
      left = elmRect.left - tipRect.width - offset;
    } else {
      left = elmRect.left + elmRect.width / 2 - tipRect.width / 2;
    }

    if (fitsBottom) {
      top = elmRect.bottom + offset;
    } else if (fitsTop) {
      top = elmRect.top - tipRect.height - offset;
    } else {
      top = elmRect.top + elmRect.height / 2 - tipRect.height / 2;
    }

    top = Math.max(
      VIEWPORT_PADDING,
      Math.min(top, vh - tipRect.height - VIEWPORT_PADDING)
    );
    left = Math.max(
      VIEWPORT_PADDING,
      Math.min(left, vw - tipRect.width - VIEWPORT_PADDING)
    );

    setCoords({ top, left });
  }, [offset]);

  useLayoutEffect(() => {
    if (!visible) return;

    const mountTimer = window.setTimeout(calculatePosition, 0);

    let debounceTimer: number;
    const handler = () => {
      clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(calculatePosition, DEBOUNCE_MS);
    };

    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, { passive: true });

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(debounceTimer);
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler);
    };
  }, [visible, calculatePosition]);

  useEffect(() => {
    if (!visible) return;
    const onClickOutside = () => setVisible(false);
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [visible]);

  return (
    <>
      <div
        ref={wrapperRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>

      {typeof window !== "undefined" && (
        <Portal>
          <div
            ref={tooltipRef}
            className={cn(
              "fixed z-50 pointer-events-none transition-opacity duration-300",
              "px-space-sm py-space-xs rounded-sm border shadow-md text-sm",
              "bg-bg-dark border border-border-muted text-text",
              visible ? "opacity-100" : "opacity-0"
            )}
            style={{ top: coords.top, left: coords.left }}
            aria-hidden
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
}
