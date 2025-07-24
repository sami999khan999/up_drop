"use client";

import { useAuthSignUp } from "@/hooks/useAuthSignUp";
import { signUpSchema } from "@/zod/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OauthButton from "./OauthButton";
import AuthInputField from "../ui/AuthInputField";
import AuthFormWrapper from "../ui/AuthFormWrapper";
import { CiLock, CiMail, CiUnlock } from "react-icons/ci";
import Button from "../ui/Button";
import Link from "next/link";
import { cn } from "@/utils/cn";
import SignUpVerification from "./SignUpVerification";
import { useState } from "react";

const SignUpForm = () => {
  const {
    onSubmit,
    verifying,
    setVerificationCode,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    resendVerificationCode,
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

  const [veri, setveri] = useState(false);

  return (
    <AuthFormWrapper>
      <div className="relative h-full overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            "duration-200",
            veri
              ? "opacity-0 scale-50 pointer-events-none"
              : "scale-100 opacity-100"
          )}
        >
          <h2 className="mb-space-base">Sign Up</h2>

          <AuthInputField
            register={register("email")}
            placeholder="test@gmail.com"
            error={errors.email?.message}
            label="Email or username"
            type="email"
            icon={<CiMail />}
          />
          <AuthInputField
            register={register("password")}
            placeholder="••••••••"
            error={errors.password?.message}
            label="Password"
            type="password"
            isVesible={showPassword}
            setIsVesible={setShowPassword}
            icon={<CiUnlock />}
          />
          <AuthInputField
            register={register("confirmPassword")}
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            label="Confirm Password"
            type="password"
            isVesible={showConfirmPassword}
            setIsVesible={setShowConfirmPassword}
            icon={<CiUnlock />}
          />
          <Button isLoading={isLoading} className="mt-space-base">
            Sign up
          </Button>
          <div className="text-text-muted text-14 mt-space-sm">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-primary text-14 cursor-pointer hover:underline"
            >
              Log in
            </Link>
          </div>
        </form>
        <SignUpVerification
          setVerificationCode={setVerificationCode}
          resendCode={resendVerificationCode}
          isVerifying={veri}
        />
      </div>
      <div>
        <div className="flex items-center gap-4 text-text-muted text-sm my-space-base">
          <hr className="flex-1 border-border-muted" />
          <span className="text-xs uppercase tracking-wide">or</span>
          <hr className="flex-1 border-border-muted" />
        </div>
        <OauthButton />
      </div>
      <Button onClick={() => setveri(!veri)}>click</Button>
    </AuthFormWrapper>
  );
};

export default SignUpForm;
