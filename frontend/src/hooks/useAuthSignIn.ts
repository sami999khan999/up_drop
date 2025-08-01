"use client";

import { SignInSchemaType } from "@/types/auth.types";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import { extractClerkError } from "@/utils/extractError";

export const useAuthSIgnIn = () => {
  const router = useRouter();

  const { signIn, isLoaded, setActive } = useSignIn();

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

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
          toast({
            title: "Login Success",
            subtitle: "Redirecting...",
            varient: "success",
          });
          router.push("/");
        } else {
          setAuthError(true);
          toast({
            title: "Login Error",
            subtitle: "Check your credentials",
            varient: "error",
          });
          console.log("Auth Login Error");
        }
      } catch (err: unknown) {
        const message = extractClerkError(err);
        toast({
          title: "Unexpected Login Error",
          subtitle: message,
          varient: "error",
        });
        setAuthError(true);
        console.log("Unexpected Auth Login Error: ", err);
      } finally {
        setIsLoading(false);
      }
    },
    [signIn, isLoaded, router, setActive, toast]
  );

  return {
    onSubmit,
    isLoading,
    authError,
    showPassword,
    setShowPassword,
  };
};
