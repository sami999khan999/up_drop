"use client";

import {
  TOAST_ANIMATION_DURATION,
  TOAST_DISPLAY_DURATION,
  TOAST_ICONS,
} from "@/constants/ToastConstants";
import {
  ToastArgumentType,
  ToastContextType,
  ToastType,
  ToastVarientType,
} from "@/types/toast.types";
import { cn } from "@/utils/cn";
import React, { createContext, useCallback, useMemo, useState } from "react";

export const ToastContext = createContext<ToastContextType | null>(null);
const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(
    ({ title, subtitle, varient }: ToastArgumentType) => {
      const id = Date.now().toString();
      setToasts((prev) => [
        { id, title, subtitle, varient, isClicked: false, isExiting: false },
        ...prev,
      ]);

      setTimeout(() => {
        setToasts((prev) =>
          prev.map((toast) =>
            toast.id === id ? { ...toast, isExiting: true } : toast
          )
        );

        setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, TOAST_ANIMATION_DURATION);
      }, TOAST_DISPLAY_DURATION);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-2 right-0 z-50">
        {toasts.map((toast, i) => (
          <div
            key={i}
            className={cn(
              "flex items-stretch w-[20rem] md:w-[25rem] transition-all duration-300 border border-border border-x-0 rounded-l-md bg-bg mb-space-sm",
              toast.isExiting ? "toast-out" : "toast-in"
            )}
          >
            <div
              className={cn(
                "w-2 rounded-l-md shrink-0",
                toast.varient === "success" && "bg-success",
                toast.varient === "error" && "bg-danger",
                toast.varient === "warning" && "bg-warning",
                toast.varient === "info" && "bg-info"
              )}
            />

            <div className="flex items-center justify-between px-space-base w-full gap-space-base py-space-sm">
              <div className="flex-grow overflow-hidden space-y-space-xs">
                <p
                  className={cn(
                    "text-16 truncate ",
                    toast.varient === "success" && "text-success",
                    toast.varient === "error" && "text-danger",
                    toast.varient === "warning" && "text-warning",
                    toast.varient === "info" && "text-info"
                  )}
                >
                  {toast.title}
                </p>
                {toast.subtitle && (
                  <p className="text-14 text-text-muted overflow-hidden">
                    {toast.subtitle}
                  </p>
                )}
              </div>

              <div
                className={cn(
                  "w-6 h-6 text-10 border rounded-full flex items-center justify-center shrink-0",
                  toast.varient === "success" && "text-success",
                  toast.varient === "error" && "text-danger",
                  toast.varient === "warning" && "text-warning",
                  toast.varient === "info" && "text-info"
                )}
              >
                {TOAST_ICONS[toast.varient]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
