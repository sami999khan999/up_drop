"use client";

import { useAuthSignUp } from "@/hooks/useAuthSignUp";
import { signUpSchema } from "@/zod/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OauthButton from "./OauthButton";

const SignUpForm = () => {
  const { onSubmit, verifying, setVerificationCode } = useAuthSignUp();

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
        <input {...register("email")} placeholder="Email" />
        <input {...register("password")} placeholder="Password" />
        <input
          {...register("confirmPassword")}
          placeholder="Confirm Password"
        />
        <div id="clerk-captcha" />
        <button type="submit">Sign Up</button>
      </form>
      <OauthButton />
    </div>
  );
};

export default SignUpForm;
