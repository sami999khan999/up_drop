import { useSignIn } from "@clerk/nextjs";
import { useCallback, useState } from "react";

export const useOauth = () => {
  const { signIn, isLoaded } = useSignIn();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

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
      console.log("Google Oauth Error: ", err);
    } finally {
      setIsLoadingGoogle(false);
    }
  }, [signIn, isLoaded]);

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
      console.log("Github Oauth Error: ", err);
    } finally {
      setIsLoadingGithub(false);
    }
  }, [signIn, isLoaded]);

  return {
    googleOauth,
    githubOauth,
    isLoadingGoogle,
    isLoadingGithub,
  };
};
