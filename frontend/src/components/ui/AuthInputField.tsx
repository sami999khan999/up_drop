import { cn } from "@/utils/cn";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";

const AuthInputField = ({
  register,
  placeholder,
  error,
  label,
  type,
  isVesible,
  setIsVesible,
  icon,
}: {
  register: UseFormRegisterReturn<string>;
  placeholder: string;
  error: string | undefined;
  label: string;
  type: React.HTMLInputTypeAttribute;
  isVesible?: boolean;
  setIsVesible?: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="mb-space-base">
      <p className="mb-space-xs text-14 text-text ml-space-xs">{label}</p>
      <div className="relative text-base">
        <input
          {...register}
          type={type === "password" && isVesible ? "text" : type}
          placeholder={placeholder}
          className={cn(
            "w-full border border-border-muted text-text-muted py-3 px-10 rounded-lg bg-bg outline-none"
          )}
          inputMode={type === "email" ? "email" : "text"}
          autoComplete={type === "email" ? "email" : "off"}
        />
        <div className="text-text absolute top-1/2 left-3 -translate-y-1/2">
          {icon}
        </div>
        {type === "password" && (
          <div
            className="text-text absolute top-1/2 right-3 -translate-y-1/2"
            onClick={() => !!setIsVesible && setIsVesible((prev) => !prev)}
          >
            {isVesible ? <PiEyeThin /> : <PiEyeSlashThin />}
          </div>
        )}
      </div>
      <p className="text-sm text-danger mt-space-xs">{!!error && error}</p>
    </div>
  );
};

export default AuthInputField;
