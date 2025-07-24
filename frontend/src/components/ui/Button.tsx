import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none duration-200 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-text hover:bg-secondary rounded-xl",
        secondary: "bg-secondary text-text hover:bg-primary",
        outline: "border border-border text-text hover:bg-bg-light",
        ghost: "hover:bg-bg-light text-text-muted",
        danger: "bg-danger text-bg hover:bg-danger/90",
      },
      size: {
        sm: "py-2 px-3 text-14",
        md: "py-2 px-4 text-14",
        lg: "w-full py-2 px-6 text-16",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = ({
  children,
  isLoading = false,
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300",
          isLoading ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}
      >
        <AiOutlineLoading3Quarters className="animate-spin text-xl" />
      </span>

      <span
        className={cn(
          "transition-all duration-300",
          isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
