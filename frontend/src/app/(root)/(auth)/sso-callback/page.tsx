// src/app/sso-callback/page.tsx
"use client";

import Spiner from "@/components/ui/Spiner";
import { AuthenticateWithRedirectCallback, useAuth } from "@clerk/nextjs";

export default function SsoCallbackPage() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen text-text">
        <Spiner className="text-32" />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
