"use client";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
export default function ClerkHandshakeClient() {
  const params = useSearchParams();
  if (params?.has("__clerk_handshake")) {
    return <AuthenticateWithRedirectCallback redirectUrl="/" />;
  }
  return null;
}
