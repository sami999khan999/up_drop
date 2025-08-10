// useOauth.ts (improved)
import { extractClerkError } from "@/utils/extractError";
import { useSignIn } from "@clerk/nextjs";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";

export const useOauth = () => {
  const { signIn, isLoaded } = useSignIn();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

  const toast = useToast();

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  console.log(origin);

  const googleOauth = useCallback(async () => {
    if (!isLoaded) return;
    setIsLoadingGoogle(true);

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${origin}/sso-callback`,
        redirectUrlComplete: `${origin}/sso-callback`,
      });
    } catch (err) {
      const message = extractClerkError(err);
      toast({
        title: "Google Auth Error",
        subtitle: message,
        varient: "error",
      });
      console.log("Google Oauth Error: ", err);
      setIsLoadingGoogle(false);
    }
  }, [signIn, isLoaded, toast, origin]);

  const githubOauth = useCallback(async () => {
    if (!isLoaded) return;
    setIsLoadingGithub(true);

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: `${origin}/sso-callback`,
        redirectUrlComplete: `${origin}/sso-callback`,
      });
    } catch (err) {
      const message = extractClerkError(err);
      toast({
        title: "GitHub Auth Error",
        subtitle: message,
        varient: "error",
      });
      console.log("Github Oauth Error: ", err);
      setIsLoadingGithub(false);
    }
  }, [signIn, isLoaded, toast, origin]);

  return {
    googleOauth,
    githubOauth,
    isLoadingGoogle,
    isLoadingGithub,
  };
};
