"use client";
import { useAuth, useClerk } from "@clerk/nextjs";
import React, { useEffect } from "react";

const Page = () => {
  const { signOut } = useClerk();
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return; // wait until Clerk finishes loading

    console.log("userId:", userId); // now it's safe

    fetch("http://localhost:8000/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [isLoaded, userId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
      <p>Your user ID is: {userId}</p>
    </div>
  );
};

export default Page;
