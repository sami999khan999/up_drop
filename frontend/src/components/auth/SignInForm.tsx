"use client";

import { useAuthSIgnIn } from "@/hooks/useAuthSignIn";
import { signInSchema } from "@/zod/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CiLock, CiMail, CiUnlock } from "react-icons/ci";
import AuthFormWrapper from "../ui/AuthFormWrapper";
import AuthInputField from "../ui/AuthInputField";
import Button from "../ui/Button";
import OauthButton from "./OauthButton";

const SignInForm = () => {
  // const { userId } = useAuth();

  // if (userId) {
  //   redirect("/");
  // }

  const { onSubmit, showPassword, setShowPassword, isLoading } =
    useAuthSIgnIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  return (
    <AuthFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-space-base">Log In</h2>

        <AuthInputField
          register={register("identifier")}
          placeholder="test@gmail.com"
          error={errors.identifier?.message}
          label="Email or username"
          type="email"
          icon={<CiMail />}
        />
        <AuthInputField
          register={register("password")}
          placeholder="••••••••"
          error={errors.password?.message}
          label="Password"
          type={"password"}
          isVesible={showPassword}
          setIsVesible={setShowPassword}
          icon={showPassword ? <CiUnlock /> : <CiLock />}
        />
        <Button type="submit" isLoading={isLoading} className="mt-space-base">
          Sign in
        </Button>
        <div className="text-text-muted text-14 mt-space-sm">
          {`${"Don't have an account? "}`}
          <Link
            href={"/register"}
            className="text-primary text-14 cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
      <div className="flex items-center gap-4 text-text-muted text-sm my-space-base">
        <hr className="flex-1 border-border-muted" />
        <span className="text-xs uppercase tracking-wide">or</span>
        <hr className="flex-1 border-border-muted" />
      </div>
      <OauthButton />
    </AuthFormWrapper>
  );
};

export default SignInForm;
