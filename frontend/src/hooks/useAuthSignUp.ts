"use client";

import { SignUpSchemaType } from "@/types/auth.types";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./useToast";
import { extractClerkError } from "@/utils/extractError";

export const useAuthSignUp = () => {
  const router = useRouter();

  const { signUp, isLoaded, setActive } = useSignUp();

  const [verifying, setVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toast = useToast();

  const onSubmit = useCallback(
    async (data: SignUpSchemaType) => {
      if (!isLoaded) return;

      setIsLoading(true);

      try {
        await signUp.create({
          emailAddress: data.email,
          password: data.password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        toast({
          title: "Verification Email Sent",
          subtitle:
            "Check your inbox for a 6-digit code to verify your email address.",
          varient: "success",
        });
        setVerifying(true);
      } catch (err: unknown) {
        const message = extractClerkError(err);
        toast({
          title: "Signup Failed",
          subtitle: message,
          varient: "error",
        });
        setAuthError(true);
        console.log("Auth Error: ", err);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, signUp, toast]
  );

  const handleVerification = useCallback(async () => {
    if (!isLoaded || isLoading) return;

    setIsLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast({
          title: "Email Verified",
          subtitle: "Signup successful! Redirecting...",
          varient: "success",
        });

        router.push("/");
      } else {
        setVerificationCodeError(true);
        toast({
          title: "Invalid Code",
          subtitle: "The verification code is incorrect. Please try again.",
          varient: "error",
        });
        console.log("Auth Verification Error");
      }
    } catch (err: unknown) {
      const message = extractClerkError(err);
      setVerificationCodeError(true);
      toast({
        title: "Verification Failed",
        subtitle: message,
        varient: "error",
      });
      console.log("Unexpected Auth Verification Error: ", err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isLoading, signUp, verificationCode, router, setActive, toast]);

  const resendVerificationCode = useCallback(async () => {
    if (!isLoaded) return;

    setIsLoading(true);

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast({
        title: "Verification Code Resent",
        subtitle: "A new verification code has been sent to your email.",
        varient: "success",
      });
      setVerifying(true);
    } catch (err: unknown) {
      const message = extractClerkError(err);
      toast({
        title: "Resend Failed",
        subtitle: message,
        varient: "error",
      });
      console.log("Resend Verification Error: ", err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, signUp, toast]);

  useEffect(() => {
    if (verificationCode.length !== 6) return;

    const timeout = setTimeout(() => {
      handleVerification();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [verificationCode, handleVerification]);

  return {
    onSubmit,
    resendVerificationCode,
    verifying,
    setVerifying,
    isLoading,
    setVerificationCode,
    verificationCodeError,
    authError,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};
