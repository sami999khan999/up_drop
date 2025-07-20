import { useOauth } from "@/hooks/useOauth";
import React from "react";

const OauthButton = () => {
  const { googleOauth, githubOauth } = useOauth();

  return (
    <div className="flex flex-col">
      <button type="button" onClick={googleOauth}>
        Google
      </button>
      <button type="button" onClick={githubOauth}>
        GitHub
      </button>
    </div>
  );
};

export default OauthButton;
