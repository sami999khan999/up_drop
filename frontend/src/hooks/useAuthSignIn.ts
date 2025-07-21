"use client";

import { SignInSchemaType } from "@/zod/signInSchema";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const useAuthSIgnIn = () => {
  const router = useRouter();

  const { signIn, isLoaded, setActive } = useSignIn();

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(
    async (data: SignInSchemaType) => {
      if (!isLoaded) return;

      setIsLoading(true);

      try {
        const reasult = await signIn.create({
          identifier: data.identifier,
          password: data.password,
        });

        if (reasult.status === "complete") {
          await setActive({ session: reasult.createdSessionId });
          router.push("/");
        } else {
          setAuthError(true);
          console.log("Auth Login Error");
        }
      } catch (error) {
        setAuthError(true);
        console.log("Unexpected Auth Login Error: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [signIn, isLoaded, router, setActive]
  );

  return {
    onSubmit,
    isLoading,
    authError,
    showPassword,
    setShowPassword,
  };
};
