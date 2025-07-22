"use client";

import { AuthenticateWithRedirectCallback, useAuth } from "@clerk/nextjs";

export default function SsoCallbackPage() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <AuthenticateWithRedirectCallback />;
}
