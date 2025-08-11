"use client";

import Spiner from "@/components/ui/Spiner";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SsoCallbackPage() {
  // const { isLoaded } = useAuth();

  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div className="h-screen">
        <AuthenticateWithRedirectCallback />
        <div className="flex items-center justify-center text-text h-screen">
          <Spiner className="text-32" />
        </div>
      </div>
    </>
  );
}
