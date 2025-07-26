import { ToastContext } from "@/components/ui/ToastProvider";
import { useContext } from "react";

export const useToast = () => {
  const toast = useContext(ToastContext);

  if (!toast) throw new Error("useToast must be used within ToastProvider");

  return toast.addToast;
};
