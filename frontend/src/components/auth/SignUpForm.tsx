"use client";

import { useAuthSignUp } from "@/hooks/useAuthSignUp";
import { cn } from "@/utils/cn";
import { signUpSchema } from "@/zod/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiMail, CiUnlock } from "react-icons/ci";
import AuthFormWrapper from "../ui/AuthFormWrapper";
import AuthInputField from "../ui/AuthInputField";
import Button from "../ui/Button";
import OauthButton from "./OauthButton";
import SignUpVerification from "./SignUpVerification";
import { useToast } from "@/hooks/useToast";

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

  const toast = useToast();

  return (
    <AuthFormWrapper>
      <div className="relative h-full overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            "duration-200",
            verifying ? "animate-out" : "animate-in"
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
          isVerifying={verifying}
          isLoading={isLoading}
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
      <Button
        onClick={() =>
          toast({
            title: "Test",
            varient: "success",
            subtitle:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ut nostrum error, placeat perspiciatis nam temporibus aperiam eaque nesciunt. Impedit.",
          })
        }
      >
        click
      </Button>
    </AuthFormWrapper>
  );
};

export default SignUpForm;
