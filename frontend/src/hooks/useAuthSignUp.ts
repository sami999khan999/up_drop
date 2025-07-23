"use client";

import { SignUpSchemaType } from "@/types/auth.types";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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

        setVerifying(true);
      } catch (err) {
        setAuthError(true);
        console.log("Auth Error: ", err);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, signUp, isLoaded, signUp]
  );

  const handelVerification = useCallback(async () => {
    if (!isLoaded) return;

    setIsLoading(true);

    try {
      const reasult = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (reasult.status === "complete") {
        await setActive({ session: reasult.createdSessionId });
        router.push("/");
      } else {
        setVerificationCodeError(true);
        console.log("Auth Verification Error");
      }
    } catch (err) {
      setVerificationCodeError(true);
      console.log("Unexpected Auth Verification Error: ", err);
    }
  }, [isLoaded, signUp, verificationCode, router, setActive]);

  const resendVerificationCode = useCallback(async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      console.log("Resend Verification Error: ", err);
    }
  }, [isLoaded, signUp]);

  useEffect(() => {
    if (verificationCode.length === 6) {
      handelVerification();
    }
  }, [verificationCode, handelVerification]);

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
