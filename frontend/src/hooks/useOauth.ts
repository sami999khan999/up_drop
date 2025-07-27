import { extractClerkError } from "@/utils/extractError";
import { useSignIn } from "@clerk/nextjs";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";

export const useOauth = () => {
  const { signIn, isLoaded } = useSignIn();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

  const toast = useToast();

  const googleOauth = useCallback(async () => {
    if (!isLoaded) return;

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
  }, [signIn, isLoaded, toast]);

  const githubOauth = useCallback(async () => {
    if (!isLoaded) return;

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
  }, [signIn, isLoaded, toast]);

  return {
    googleOauth,
    githubOauth,
    isLoadingGoogle,
    isLoadingGithub,
  };
};
