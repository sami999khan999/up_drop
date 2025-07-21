"use client";

import { useAuthSIgnIn } from "@/hooks/useAuthSignIn";
import { signInSchema } from "@/zod/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OauthButton from "./OauthButton";

const SignInForm = () => {
  const { onSubmit } = useAuthSIgnIn();

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
        <input
          type="text"
          placeholder="Email or username"
          {...register("identifier")}
        />
        <p>{errors.identifier?.message}</p>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <button type="submit">Sign In</button>
      </form>
      <OauthButton />
    </div>
  );
};

export default SignInForm;
