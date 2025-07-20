"use client";

import { useClerk } from "@clerk/nextjs";
import React from "react";

const page = () => {
  const { signOut } = useClerk();
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default page;
