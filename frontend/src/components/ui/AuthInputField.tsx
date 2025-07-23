import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

const AuthInputField = ({
  register,
  placeholder,
  error,
  label,
  type,
  isVesible,
  setIsVesible,
}: {
  register: UseFormRegisterReturn<string>;
  placeholder: string;
  error: string | undefined;
  label: string;
  type: string;
  isVesible?: boolean;
  setIsVesible?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <p>{label}</p>
      <input {...register} type={type} placeholder={placeholder} />
      <p>{!!error && error}</p>
    </div>
  );
};

export default AuthInputField;
