"use client";

import { useAuthSIgnIn } from "@/hooks/useAuthSignIn";
import { signInSchema } from "@/zod/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthInputField from "../ui/AuthInputField";
import OauthButton from "./OauthButton";

const SignInForm = () => {
  const { onSubmit, showPassword, setShowPassword } = useAuthSIgnIn();

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInputField
          register={register("identifier")}
          placeholder="test@gmail.com"
          error={errors.identifier?.message}
          label="Email or username"
          type="email"
        />
        <AuthInputField
          register={register("password")}
          placeholder="••••••••"
          error={errors.password?.message}
          label="Password"
          type={showPassword ? "text" : "password"}
          isVesible={showPassword}
          setIsVesible={setShowPassword}
        />
        <button type="submit">Sign In</button>
      </form>
      <OauthButton />
    </div>
  );
};

export default SignInForm;
