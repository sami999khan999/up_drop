import React from "react";

const AuthFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex justify-end">
      <div className="bg-bg w-full md:w-[600px] 2xl:w-[700px] md:border-l border-border-muted flex justify-center items-start h-full overflow-auto py-space-lg hide-scrollbar">
        <div className="w-full max-w-[500px] px-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
