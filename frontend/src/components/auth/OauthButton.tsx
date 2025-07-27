import { useOauth } from "@/hooks/useOauth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React from "react";
import Spiner from "../ui/Spiner";
import { cn } from "@/utils/cn";

const OauthButton = () => {
  const { googleOauth, githubOauth, isLoadingGithub, isLoadingGoogle } =
    useOauth();

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={googleOauth}
        className="flex items-center justify-center gap-3 border border-border-muted rounded-lg px-4 py-2 text-sm text-text-muted hover:bg-bg-light transition-colors relative"
      >
        <FcGoogle size={20} />
        Continue with Google
        <span
          className={cn(
            "absolute right-space-base",
            isLoadingGoogle ? "scale-100 opacity-100" : "scale-50 opacity-0"
          )}
        >
          <Spiner className="text-16" />
        </span>
      </button>

      <button
        type="button"
        onClick={githubOauth}
        className="flex items-center justify-center gap-3 border border-border-muted rounded-lg px-4 py-2 text-sm text-text-muted hover:bg-bg-light transition-colors relative"
      >
        <FaGithub size={20} className="text-text-muted" />
        Continue with GitHub
        <span
          className={cn(
            "absolute right-space-base",
            isLoadingGithub ? "scale-100 opacity-100" : "scale-50 opacity-0"
          )}
        >
          <Spiner className="text-16" />
        </span>
      </button>
    </div>
  );
};

export default OauthButton;
