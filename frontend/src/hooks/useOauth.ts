// src/hooks/useOauth.ts
import { extractClerkError } from "@/utils/extractError";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";

export const useOauth = () => {
  const { signIn, isLoaded } = useSignIn();
  const { userId } = useAuth(); // <-- Import and use the useAuth hook to get the userId
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

  const toast = useToast();

  const googleOauth = useCallback(async () => {
    if (!isLoaded) return; // Check if the user is already authenticated
    if (userId) {
      // Redirect to the home page if a session already exists
      window.location.href = "/";
      return;
    }

    setIsLoadingGoogle(true);

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      const message = extractClerkError(err);
      toast({
        title: "Google Auth Error",
        subtitle: message,
        varient: "error",
      });
      console.log("Google Oauth Error: ", err);
    } finally {
      setIsLoadingGoogle(false);
    }
  }, [signIn, isLoaded, toast, userId]); // <-- Add userId to the dependency array

  const githubOauth = useCallback(async () => {
    if (!isLoaded) return; // Check if the user is already authenticated
    if (userId) {
      // Redirect to the home page if a session already exists
      window.location.href = "/";
      return;
    }

    setIsLoadingGithub(true);

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      const message = extractClerkError(err);
      toast({
        title: "GitHub Auth Error",
        subtitle: message,
        varient: "error",
      });
      console.log("Github Oauth Error: ", err);
    } finally {
      setIsLoadingGithub(false);
    }
  }, [signIn, isLoaded, toast, userId]); // <-- Add userId to the dependency array

  return {
    googleOauth,
    githubOauth,
    isLoadingGoogle,
    isLoadingGithub,
  };
};
