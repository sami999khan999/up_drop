import { useOauth } from "@/hooks/useOauth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React from "react";

const OauthButton = () => {
  const { googleOauth, githubOauth } = useOauth();

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={googleOauth}
        className="flex items-center justify-center gap-3 border border-border-muted rounded-lg px-4 py-2 text-sm text-text-muted hover:bg-bg-light transition-colors"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>

      <button
        type="button"
        onClick={githubOauth}
        className="flex items-center justify-center gap-3 border border-border-muted rounded-lg px-4 py-2 text-sm text-text-muted hover:bg-bg-light transition-colors"
      >
        <FaGithub size={20} className="text-text-muted" />
        Continue with GitHub
      </button>
    </div>
  );
};

export default OauthButton;
