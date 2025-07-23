"use client";

import { useAuthSignUp } from "@/hooks/useAuthSignUp";
import { signUpSchema } from "@/zod/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OauthButton from "./OauthButton";
import AuthInputField from "../ui/AuthInputField";

const SignUpForm = () => {
  const {
    onSubmit,
    verifying,
    setVerificationCode,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useAuthSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  console.log(verifying);
  console.log(errors);

  if (verifying) {
    return (
      <div>
        <input
          type="number"
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInputField
          register={register("email")}
          placeholder="test@gmail.com"
          error={errors.email?.message}
          label="Email or username"
          type="email"
        />
        <AuthInputField
          register={register("password")}
          placeholder="••••••••"
          error={errors.password?.message}
          label="Password"
          type="password"
          isVesible={showPassword}
          setIsVesible={setShowPassword}
        />
        <AuthInputField
          register={register("confirmPassword")}
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          label="Confirm Password"
          type="password"
          isVesible={showConfirmPassword}
          setIsVesible={setShowConfirmPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
      <OauthButton />
    </div>
  );
};

export default SignUpForm;
