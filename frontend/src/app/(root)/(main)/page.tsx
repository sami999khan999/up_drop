"use client";
import { useAuth, useClerk } from "@clerk/nextjs";
import React, { useEffect } from "react";

const Page = () => {
  const { signOut } = useClerk();
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    console.log("userId:", userId);
  }, [isLoaded, userId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => signOut()} className="text-text">
        Logout
      </button>
      <p>Your user ID is: {userId}</p>
    </div>
  );
};

export default Page;
