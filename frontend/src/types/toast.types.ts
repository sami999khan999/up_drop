import { ReactNode } from "react";

export type ToastVarientType = "success" | "error" | "warning" | "info";

export interface ToastArgumentType {
  title: string;
  subtitle?: string;
  varient: ToastVarientType;
}

export interface ToastContextType {
  addToast: ({ title, subtitle, varient }: ToastArgumentType) => void;
}

export type ToastConstantsType = {
  [key in ToastVarientType]: ReactNode;
};

export type ToastType = {
  id: string;
  title: string;
  subtitle?: string;
  varient: ToastVarientType;
  isExiting: boolean;
  isClicked: boolean;
  isPused: boolean;
};
